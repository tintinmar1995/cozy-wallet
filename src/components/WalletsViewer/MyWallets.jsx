import React, { Component } from 'react'
import Wallet from './Wallet'

import { withClient } from 'cozy-client'
import SelectBox from 'cozy-ui/transpiled/react/SelectBox'
import Empty from 'cozy-ui/react/Empty'

export class MyWallets extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      dirId: '',
      wallets: [],
      selectedWallet: {},
      availableConnectors: [],
      installedConnectors: []
    }
  }

  loadWalletsId = async () => {
    var ids = { dirId: '', filesId: [] }
    const { client } = this.props
    var selectedWallet = {}

    // Get the id of the folder "My Wallets", and the content's id
    try {
      ids = await client.stackClient
        .fetchJSON('GET', '/files/metadata?Path=/My%20Wallets')
        .then(response => {
          return {
            dirId: response.data.id,
            filesId: response.data.relationships.contents.data
          }
        })
    } catch (e) {
      // Create the folder "My Wallets" and get its id
      ids = await client.stackClient
        .fetchJSON('POST', '/files/?Type=directory&Name=My%20Wallets')
        .then(response => {
          return { dirId: response.data.id, filesId: [] }
        })
        .catch(error => {
          alert(error)
        })
    }

    var wallets = []
    var name = ''
    for (var idxFiles = 0; idxFiles < ids.filesId.length; idxFiles++) {
      // Get Wallet's name
      name = await client.stackClient
        .fetchJSON('GET', '/files/' + ids.filesId[idxFiles].id)
        .then(response => {
          return response.data.attributes.name
        })
        .catch(e => {
          alert(e)
        })

      wallets.push({
        value: ids.filesId[idxFiles].id,
        label: name.replace('.csv', '')
      })
    }

    if (wallets.length != 0) {
      selectedWallet = wallets[0]
    }

    this.setState({
      dirId: ids.dirId,
      wallets: wallets,
      selectedWallet: selectedWallet
    })
  }

  loadConnectors = async () => {
    const { client } = this.props

    // get connectors

    const availableConnectors = await client.stackClient
      .fetchJSON('GET', '/registry?filter[type]=konnector')
      .then(response => {
        var availableConnectors = []
        for (var i = 0; i < response.data.length; i++) {
          try {
            availableConnectors.push({
              name: {
                label: response.data[i].latest_version.manifest.name,
                value: response.data[i].latest_version.manifest.name
              },
              slug: {
                label: response.data[i].slug,
                value: response.data[i].slug
              }
            })
          } catch (e) {
            console.log(JSON.stringify(response.data[i]))
          }
        }
        return availableConnectors
      })

    // get installed connectors
    const installedConnectors = await client.stackClient
      .fetchJSON('GET', '/konnectors/')
      .then(response => {
        return response.data
      })
      .catch(error => {
        alert(error)
      })

    this.setState({
      availableConnectors: availableConnectors,
      installedConnectors: installedConnectors
    })
  }

  render() {
    var out = []

    out.push(
      <div style={{ margin: '20px' }}>
        <form>
          <SelectBox
            options={this.state.wallets}
            value={this.state.selectedWallet}
            onChange={event => {
              this.setState({ selectedWallet: event })
            }}
            fullwidth
            placeholder="Open a wallet..."
          />
        </form>
      </div>
    )

    if (this.state.wallets.length == 0) {
      out.push(
        <div
          style={{
            position: 'relative',
            transform: 'translateZ(0)',
            height: '300px',
            display: 'flex'
          }}
        >
          <Empty
            icon="cozy"
            title="You have no wallet"
            text="Try adding some wallet"
          />
        </div>
      )
    } else if (!this.state.selectedWallet.label) {
      out.push(
        <div
          style={{
            position: 'relative',
            transform: 'translateZ(0)',
            height: '300px',
            display: 'flex'
          }}
        >
          <Empty
            icon="cozy"
            title="No wallet selected"
            text="Please select a wallet"
          />
        </div>
      )
    } else {
      for (
        var idxWallet = 0;
        idxWallet < this.state.wallets.length;
        idxWallet++
      ) {
        out.push(
          <Wallet
            disabled={
              this.state.wallets[idxWallet] != this.state.selectedWallet
            }
            id={this.state.wallets[idxWallet].value}
            name={this.state.wallets[idxWallet].label}
            availableConnectors={this.state.availableConnectors}
            installedConnectors={this.state.installedConnectors}
          />
        )
      }
    }

    return <div>{out}</div>
  }

  componentDidMount() {
    this.loadWalletsId()
    this.loadConnectors()
  }
}

export default withClient(MyWallets)
