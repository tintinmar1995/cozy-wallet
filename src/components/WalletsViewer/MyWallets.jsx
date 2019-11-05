import React, { Component } from 'react'
import Wallet from './Wallet'

import { withClient } from 'cozy-client'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'

export class MyWallets extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { filesId: [] }
  }

  loadWalletsId = async () => {
    var filesId = []
    const { client } = this.props

    // Get the id of the folder "My Wallets"
    try {
      filesId = await client.stackClient
        .fetchJSON('GET', '/files/metadata?Path=/My%20Wallets')
        .then(response => {
          return response.data.relationships.contents.data
        })
    } catch (e) {
      // Create the folder "My Wallets" and get its id
      filesId = await client.stackClient
        .fetchJSON('POST', '/files/?Type=directory&Name=My%20Wallets')
        .then(() => {
          return []
        })
        .catch(error => {
          alert(error)
        })
    }

    this.setState({ filesId: filesId })
  }

  render() {
    var out = []

    this.loadWalletsId()

    // For each wallet, add it to the page
    for (var index = 0; index < this.state.filesId.length; index++) {
      out.push(
        <MuiCozyTheme>
          <Wallet id={this.state.filesId[index].id} />
        </MuiCozyTheme>
      )
    }

    return <div>{out}</div>
  }
}

export default withClient(MyWallets)
