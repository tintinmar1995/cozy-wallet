import React, { Component } from 'react'

import { withClient } from 'cozy-client'
import EditWallet from './EditWallet'
import Button from 'cozy-ui/react/Button'
import Input from 'cozy-ui/react/Input'

export class ListOfWallets extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      wallets: [],
      checkDone: false
    }
  }

  newWallet = async () => {
    const { client } = this.props

    // Create dummy file
    await client.stackClient
      .fetchJSON(
        'POST',
        '/files/' +
          this.state.dirId +
          '?Type=file&Name=' +
          this.state.newWalletName +
          '.csv',
        '_id,store,note,cardid,headercolor,headertextcolor,barcodetype\r\n1,Exemple,This is a note,2070253157477,-5414233,-1,EAN_13\r\n'
      )
      .then(response => {
        const { wallets } = this.state

        wallets.push({
          label: this.state.newWalletName,
          value: response.data.id
        })
        this.setState({
          wallets: wallets,
          newWalletName: ''
        })
      })
      .catch(error => {
        alert(error)
      })
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

    this.setState({
      dirId: ids.dirId,
      wallets: wallets,
      checkDone: true
    })
  }

  render() {
    var out = []
    const { boolEdit, wallets, newValue } = this.state

    if (!this.state.checkDone) {
      this.loadWalletsId()
    }

    out.push(
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ background: 'white', width: '80%' }}>
          <Input
            fullwidth
            value={this.state.newWalletName}
            onChange={event => {
              this.setState({ newWalletName: event.target.value })
            }}
            placeholder="Create a new wallet..."
          />
        </div>
        <div>
          <Button
            busy={this.state.busy}
            type="button"
            theme="highlight"
            onClick={this.newWallet}
            label="Create"
            icon="wallet"
            size="large"
            extension="narrow"
          />
        </div>
      </div>
    )

    for (var i = 0; i < wallets.length; i++) {
      out.push(<EditWallet wallet={wallets[i]} />)
    }

    return <div>{out}</div>
  }
}

export default withClient(ListOfWallets)
