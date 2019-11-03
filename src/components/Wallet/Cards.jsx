import React, { Component } from 'react'
import Papa from 'papaparse'
import Empty from 'cozy-ui/react/Empty'
import Card from './Card'

import { withClient } from 'cozy-client'

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

    client.stackClient
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
      .catch(error => {
        alert(error)
      })
  }

  updateData = result => {
    var data = result.data
    this.setState({ data: data })
  }

  render() {
    const { data } = this.state

    if (data.length > 0) {
      // Sort card by STORE
      function compare(a, b) {
        if (a.store < b.store) {
          return -1
        }
        if (a.store > b.store) {
          return 1
        }
        return 0
      }
      data.sort(compare)

      var out = []
      for (var i = 0; i < data.length; i++) {
        out.push(
          <Card
            id={i}
            data={data[i]}
            onClick={async i => {
              this.state.data.splice(i, 1)

              var newFile = Papa.unparse(this.state.data)
              const { client } = this.props

              // Get file's id
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

              newFile = newFile
                .split(',,,,,,\r\n')
                .join('')
                .split(',,,,,,')
                .join('')

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

// get mutations from the client to use deleteDocument
export default withClient(Cards)
