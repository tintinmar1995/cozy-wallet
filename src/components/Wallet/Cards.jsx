import React, { Component } from 'react'
import Papa from 'papaparse'
import Empty from 'cozy-ui/react/Empty'
import Card from './Card'

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

export class Cards extends Component {
  constructor(props, context) {
    super(props, context)
    // initial component state
    this.state = {
      boolLoading: true,
      csvFile: '',
      data: []
    }

    this.loadCards()
  }

  // load cards from csv file
  loadCards = async () => {
    const { client } = this.props
    var idFolder = ''

    // First, we try to load the file at its default location
    // If the file is not found, it is going to be created with an example
    // To create the file, the following cases are dealt with
    // - the folder is existing but not the file
    // - both the folder and the file are unexistant
    // From 1 to 4 call to VFS are made
    try {
      await client.stackClient
        .fetchJSON(
          'GET',
          '/files/download?Path=/Wallet/LoyaltyCardKeychain.csv&Dl=1'
        )
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
    } catch (error) {
      if (error.message.includes('file does not exist')) {
        try {
          // Create the repository Wallet and get Folder's id
          idFolder = await client.stackClient
            .fetchJSON('POST', '/files/?Type=directory&Name=Wallet')
            .then(response => {
              return response.data.id
            })
        } catch (error) {
          // Catch error if folder already exist and get Folder's id
          if (error.message.includes('Wallet: file exists')) {
            idFolder = await client.stackClient
              .fetchJSON('GET', '/files/metadata?Path=/Wallet')
              .then(response => {
                return response.data.id
              })
              .catch(error => {
                alert(error)
              })
          } else {
            alert(error)
          }
        }

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
    }
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
              const { client } = this.props

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

              // Get previous CSV file's id
              const fileID = await client.stackClient
                .fetchJSON(
                  'GET',
                  '/files/metadata?Path=/Wallet/LoyaltyCardKeychain.csv'
                )
                .then(response => {
                  return response.data.id
                })
                .catch(error => {
                  alert(error)
                })

              // Update the file in Cozy Drive
              client.stackClient
                .fetchJSON('PUT', '/files/' + fileID, newFile)
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
      return <div>{out}</div>
    } else {
      // In case, there is no card in the wallet file
      return (
        <div
          style={{
            position: 'relative',
            transform: 'translateZ(0)',
            height: '500px',
            display: 'flex'
          }}
        >
          <Empty
            icon="cozy"
            title="This list is empty"
            text="Try adding some content to this list"
          />
        </div>
      )
    }
  }
}

export default withClient(Cards)
