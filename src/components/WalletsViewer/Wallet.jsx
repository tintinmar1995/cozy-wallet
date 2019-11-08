import React, { Component } from 'react'
import Papa from 'papaparse'
import Card from './Card'
import Button from 'cozy-ui/transpiled/react/MuiCozyTheme/Buttons'
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
      isEmpty: false,
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
  }

  updateData = result => {
    var data = result.data
    this.setState({
      data: data,
      isEmpty: data.length == 0 || (data.length == 1 && !data[0].store)
    })
  }

  render() {
    const { data, isEmpty } = this.state

    if (!isEmpty) {
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
              this.setState({
                isEmpty:
                  data.length == 0 || (data.length == 1 && !data[0].store)
              })
              // Converting the array to a CSV file
              var newFile = Papa.unparse(this.state.data)
              // Clean card and prevent from empty lines
              newFile = newFile
                .split(',,,,,,\r\n')
                .join('')
                .split(',,,,,,')
                .join('')

              // Update the file in Cozy Drive
              const res = await client.stackClient
                .fetchJSON('PUT', '/files/' + id, newFile)
                .then(response => {
                  return response
                })
                .catch(error => {
                  alert(error)
                })

              this.setState({
                boolModal: false,
                res: res
              })
            }}
            availableConnectors={this.props.availableConnectors}
            installedConnectors={this.props.installedConnectors}
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
      return (
        <ExpansionPanel style={{ marginRight: '50px' }}>
          <ExpansionPanelSummary>
            {this.state.name.replace('.csv', '')}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Button
              variant="contained"
              className="u-m-1"
              icon="trash"
              theme="danger"
              onClick={() => {
                const { client, id } = this.props
                client.stackClient
                  .fetchJSON('DELETE', '/files/' + id)
                  .catch(error => {
                    alert(error)
                  })
              }}
            >
              Delete
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    }
  }
}

export default withClient(Wallet)
