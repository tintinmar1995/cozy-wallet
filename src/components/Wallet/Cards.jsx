import React, { Component } from 'react'
import Papa from 'papaparse'

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

    return (
      <div>
        <p>{data.length > 0 && JSON.stringify(data[0])}</p>
      </div>
    )
  }
}

// get mutations from the client to use deleteDocument
export default withClient(Cards)
