import React, { Component } from 'react'
import Papa from 'papaparse'
import Card from './Card'
import Button from 'cozy-ui/transpiled/react/MuiCozyTheme/Buttons'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

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

    this.state = {
      csvFile: '',
      isLoading: true,
      isEmpty: false,
      disabled: this.props.disabled,
      data: []
    }

    this.loadCards()
  }

  // load cards from csv file
  loadCards = async () => {
    const { client, id } = this.props

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
      isLoading: false,
      isEmpty: data.length == 0 || (data.length == 1 && !data[0].store)
    })
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.disabled !== this.state.disabled) {
      this.setState({ disabled: nextProps.disabled })
    }
  }

  render() {
    const { data, isEmpty } = this.state

    if (!this.props.name || this.props.name == '' || this.state.disabled) {
      return null
    } else if (this.state.isLoading) {
      return (
        <div
          style={{
            margin: 'auto',
            width: '50%',
            padding: '10px'
          }}
        >
          <Spinner size="xxlarge" />
        </div>
      )
    } else if (!isEmpty) {
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
      return <div>{out}</div>
    } else {
      return (
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
      )
    }
  }
}

export default withClient(Wallet)
