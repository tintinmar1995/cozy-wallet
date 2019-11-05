import React, { Component } from 'react'
import Papa from 'papaparse'
import Card from './Card'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import { withClient } from 'cozy-client'

// Compare is used to sort cards in a wallet
function compare(a, b) {
  if (a.store < b.store) {
    return -1
  }
  if (a.store > b.store) {
    return 1
  }
  return 0
}

export class Wallet extends Component {
  constructor(props, context) {
    super(props, context)
    // initial component state
    this.state = {
      boolLoading: true,
      csvFile: '',
      name: '',
      data: []
    }

    this.loadCards()
  }

  // load cards from csv file
  loadCards = async () => {
    const { client, id } = this.props

    // Get Wallet's name
    await client.stackClient
      .fetchJSON('GET', '/files/' + id)
      .then(async response => {
        try {
          this.setState({ name: response.data.attributes.name })
        } catch (err) {
          alert(err)
        }
      })

    // Get the cards
    await client.stackClient
      .fetchJSON('GET', '/files/download/' + id)
      .then(async response => {
        try {
          this.setState({ csvFile: response })
          Papa.parse(response, {
            complete: this.updateData,
            header: true
          })
        } catch (err) {
          alert(err)
        }
      })

    /*
      // Create dummy file
      await client.stackClient
        .fetchJSON(
          'POST',
          '/files/' + idFolder + '?Type=file&Name=LoyaltyCardKeychain.csv',
          '_id,store,note,cardid,headercolor,headertextcolor,barcodetype\r\n1,Exemple,This is a note,2070253157477,-5414233,-1,EAN_13\r\n'
        )
        .then(response => {
          return response.data.id
        })
    } else {
      alert(error)
    }
    */
  }

  updateData = result => {
    var data = result.data
    this.setState({ data: data })
  }

  render() {
    const { data } = this.state

    if (data.length > 0) {
      // Sort card by store
      data.sort(compare)

      var out = []
      for (var i = 0; i < data.length; i++) {
        out.push(
          <Card
            id={i}
            card={data[i]}
            onClick={async i => {
              const { client, id } = this.props

              // Deleting the card from the array of card
              this.state.data.splice(i, 1)
              // Converting the array to a CSV file
              var newFile = Papa.unparse(this.state.data)
              // Clean card and prevent from empty lines
              newFile = newFile
                .split(',,,,,,\r\n')
                .join('')
                .split(',,,,,,')
                .join('')

              // Update the file in Cozy Drive
              client.stackClient
                .fetchJSON('PUT', '/files/' + id, newFile)
                .catch(error => {
                  alert(error)
                })

              this.setState({
                boolModal: false
              })
            }}
          />
        )
      }
      return (
        <ExpansionPanel style={{ marginRight: '50px' }}>
          <ExpansionPanelSummary>
            {this.state.name.replace('.csv', '')}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>{out}</div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    } else {
      // In case, there is no card in the wallet file
      return null
    }
  }
}

export default withClient(Wallet)
