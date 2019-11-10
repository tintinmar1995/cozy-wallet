import React, { Component } from 'react'

import { withClient } from 'cozy-client'
import Button from 'cozy-ui/react/Button'
import CompositeRow from 'cozy-ui/react/CompositeRow'
import Circle from 'cozy-ui/react/Circle'
import Icon from 'cozy-ui/react/Icon'
import Input from 'cozy-ui/react/Input'

export class EditWallets extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      wallets: [],
      checkDone: false,
      boolEdit: false
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
    const { boolEdit, wallets } = this.state

    if (!this.state.checkDone) {
      this.loadWalletsId()
    }

    for (var i = 0; i < wallets.length; i++) {
      out.push(
        <CompositeRow
          primaryText={
            boolEdit ? <Input value={wallets[i].label} /> : wallets[i].label
          }
          image={
            <Circle backgroundColor="var(--melon)">
              <Icon icon="wallet" />
            </Circle>
          }
          right="temp"
          actions={
            <div>
              {!boolEdit && (
                <Button
                  icon="rename"
                  label="Rename"
                  onClick={() => {
                    this.setState({ boolEdit: !this.state.boolEdit })
                  }}
                />
              )}
              {!boolEdit && (
                <Button icon="trash" theme="danger" label="Delete" />
              )}
              {boolEdit && (
                <Button
                  label="Save"
                  onClick={() => {
                    this.setState({ boolEdit: !this.state.boolEdit })
                  }}
                />
              )}
              {boolEdit && (
                <Button
                  theme="danger"
                  label="Cancel"
                  onClick={() => {
                    this.setState({ boolEdit: !this.state.boolEdit })
                  }}
                />
              )}
            </div>
          }
          style={{
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
            boxSizing: 'border-box',
            marginLeft: '10px',
            marginRight: '10px'
          }}
        />
      )
    }

    return out
  }
}

export default withClient(EditWallets)
