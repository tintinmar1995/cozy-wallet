import React, { Component } from 'react'
import Wallet from './Wallet'

import { withClient } from 'cozy-client'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import Button from 'cozy-ui/transpiled/react/Button'
import Input from 'cozy-ui/transpiled/react/Input'
import Empty from 'cozy-ui/react/Empty'

export class MyWallets extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      dirId: '',
      filesId: [],
      creatingWallet: false,
      newWalletName: '',
      availableConnectors: [],
      installedConnectors: []
    }
  }

  loadWalletsId = async () => {
    var ids = { dirId: '', filesId: [] }
    const { client } = this.props

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

    this.setState({ dirId: ids.dirId, filesId: ids.filesId })
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

  newWallet = async () => {
    const { client } = this.props
    const { filesId } = this.state

    // Create dummy file
    const response = await client.stackClient
      .fetchJSON(
        'POST',
        '/files/' +
          this.state.dirId +
          '?Type=file&Name=' +
          this.state.newWalletName +
          '.csv',
        '_id,store,note,cardid,headercolor,headertextcolor,barcodetype\r\n1,Exemple,This is a note,2070253157477,-5414233,-1,EAN_13\r\n'
      )
      .catch(error => {
        alert(error)
      })

    filesId.push({
      type: 'io.cozy.files',
      id: response.data.id,
      fake: 'news'
    })

    this.setState({
      creatingWallet: false,
      filesId: filesId,
      newWalletName: ''
    })
  }

  render() {
    var out = []
    const { creatingWallet } = this.state

    out.push(
      <div style={{ margin: '20px' }}>
        <form>
          <Button
            theme="secondary"
            type="button"
            onClick={() => {
              this.setState({ creatingWallet: !this.state.creatingWallet })
            }}
            busy={creatingWallet}
            label="New wallet"
            size="large"
          />
          {creatingWallet && (
            <Input
              placeholder="Enter the name of your new wallet"
              value={this.state.newWalletName}
              onChange={event => {
                this.setState({ newWalletName: event.target.value })
              }}
            />
          )}
          {creatingWallet && (
            <Button
              theme="secondary"
              label="Create"
              onClick={this.newWallet}
              type="button"
              size="large"
            />
          )}
          {creatingWallet && (
            <Button
              iconOnly
              type="button"
              theme="secondary"
              onClick={() => {
                this.setState({ creatingWallet: !this.state.creatingWallet })
              }}
              label="Cancel"
              icon="cross"
              extension="narrow"
              size="large"
            />
          )}
        </form>
      </div>
    )

    // For each wallet, add it to the page
    for (var index = 0; index < this.state.filesId.length; index++) {
      out.push(
        <MuiCozyTheme>
          <Wallet
            id={this.state.filesId[index].id}
            availableConnectors={this.state.availableConnectors}
            installedConnectors={this.state.installedConnectors}
          />
        </MuiCozyTheme>
      )
    }

    if (this.state.filesId.length == 0) {
      out.push(
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

    return <div>{out}</div>
  }

  componentDidMount() {
    this.loadWalletsId()
    this.loadConnectors()
  }
}

export default withClient(MyWallets)
