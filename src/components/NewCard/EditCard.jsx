import React, { Component } from 'react'
import { Button } from 'cozy-ui/react/Button'
import Barcode from 'react-barcode'
import Label from 'cozy-ui/react/Label'
import Input from 'cozy-ui/react/Input'
import Empty from 'cozy-ui/react/Empty'
import Modal from 'cozy-ui/react/Modal'
import SelectBox, { CheckboxOption } from 'cozy-ui/transpiled/react/SelectBox'

import { withClient } from 'cozy-client'

export class EditCard extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      store: '',
      note: '',
      cardid: '',
      barcodetype: '',
      busy: false,
      wallets: [],
      selectedWallets: []
    }
    this.loadWalletsNameAndId()
  }

  addCard = async () => {
    // The templateNewLine matches with the android app LoyaltyCardLocker
    // The two unreplaced attributes are colors
    const templateNewLine =
      '[**ID**],[**STORE**],[**NOTE**],[**CARDID**],-416706,-1,[**TYPE**]\r\n'
    const { client } = this.props
    var newFile = ''
    var res = ''

    // Set the Save button as working
    this.setState({
      busy: true,
      boolModal: true,
      titleModal: 'Processing',
      textModal: ''
    })

    for (var index = 0; index < this.state.selectedWallets.length; index++) {
      // Create the body of the new file
      // Get the old file, clean it and add the new line
      newFile = await client.stackClient
        .fetchJSON(
          'GET',
          '/files/download/' + this.state.selectedWallets[index].value
        )
        .then(response => {
          return response
        })
        .catch(error => {
          alert(error)
        })

      if (newFile == '_id\r\n') {
        newFile =
          '_id,store,note,cardid,headercolor,headertextcolor,barcodetype\r\n'
      }

      // Add the new line
      // Clean the file to prevent from empty lines
      newFile =
        newFile +
        templateNewLine
          .replace('[**ID**]', newFile.split('\n').length)
          .replace('[**NOTE**]', this.state.note)
          .replace('[**STORE**]', this.state.store)
          .replace('[**CARDID**]', this.state.cardid)
          .replace('[**TYPE**]', this.state.barcodetype)
          .split(',,,,,,\r\n')
          .join('')
          .split(',,,,,,')
          .join('')

      // Update the file in Cozy's VFS
      res = await client.stackClient
        .fetchJSON(
          'PUT',
          '/files/' + this.state.selectedWallets[index].value,
          newFile
        )
        .then(response => {
          return response
        })
        .catch(error => {
          alert(error)
        })

      this.setState({
        textModal: index + 1 + '/' + this.state.selectedWallets.length
      })
    }

    this.setState({
      store: '',
      note: '',
      cardid: '',
      barcodetype: '',
      busy: false,
      selectedWallets: [],
      boolModal: true,
      titleModal: 'Success',
      textModal:
        'Your new card has been added to your wallet. Go back to your wallet to see it.',
      response: res
    })
  }

  loadWalletsNameAndId = async () => {
    var ids = {}
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

    // Get the name of every files
    for (var index = 0; index < ids.filesId.length; index++) {
      // Get Wallet's name
      ids.filesId[index].value = ids.filesId[index].id
      ids.filesId[index].label = await client.stackClient
        .fetchJSON('GET', '/files/' + ids.filesId[index].id)
        .then(response => {
          return response.data.attributes.name.replace('.csv', '')
        })
    }

    this.setState({ wallets: ids.filesId })
  }

  render() {
    return (
      <form>
        <Button
          busy={this.state.busy}
          type="button"
          onClick={this.addCard}
          label="Save"
          size="large"
          extension="narrow"
        />
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={this.state.store}
            onChange={event => {
              this.setState({ store: event.target.value })
            }}
          />
        </div>
        <div>
          <Label htmlFor="name">Note</Label>
          <Input
            id="name"
            value={this.state.note}
            onChange={event => {
              this.setState({ note: event.target.value })
            }}
          />
        </div>
        <div>
          <Label htmlFor="id">Card id</Label>
          <Input
            id="id"
            value={this.state.cardid}
            onChange={event => {
              if (event.target.value.length == 2) {
                this.setState({
                  cardid: event.target.value,
                  barcodetype: 'EAN_2'
                })
              } else if (event.target.value.length == 5) {
                this.setState({
                  cardid: event.target.value,
                  barcodetype: 'EAN_5'
                })
              } else if (event.target.value.length == 8) {
                this.setState({
                  cardid: event.target.value,
                  barcodetype: 'EAN_8'
                })
              } else if (event.target.value.length == 13) {
                this.setState({
                  cardid: event.target.value,
                  barcodetype: 'EAN_13'
                })
              } else {
                this.setState({
                  cardid: event.target.value,
                  barcodetype: 'CODE_128'
                })
              }
            }}
          />
        </div>
        <div style={{ background: 'white' }}>
          <Label htmlFor="type">Format</Label>
          <SelectBox
            id="type"
            value={{
              value: this.state.barcodetype,
              label: this.state.barcodetype
            }}
            onChange={event => {
              this.setState({ barcodetype: event.value })
            }}
            options={[
              { value: 'CODE_128', label: 'CODE128' },
              { value: 'CODE_39', label: 'CODE39' },
              {
                value: 'EAN_' + this.state.cardid.length,
                label: 'EAN',
                isDisabled:
                  this.state.cardid.length != 2 &&
                  this.state.cardid.length != 5 &&
                  this.state.cardid.length != 8 &&
                  this.state.cardid.length != 13
              },
              {
                value: 'UPC_A',
                label: 'UPC_A',
                isDisabled: this.state.cardid.length != 12
              },
              {
                value: 'UPC_E',
                label: 'UPC_E'
              }
            ]}
          />
        </div>
        <div style={{ background: 'white' }}>
          <Label htmlFor="wallet">Save in wallets</Label>
          <SelectBox
            id="wallet"
            isMulti
            onChange={event => {
              this.setState({ selectedWallets: event })
            }}
            components={{
              Option: CheckboxOption
            }}
            options={this.state.wallets}
          />
        </div>
        <br />
        <Barcode
          ref={this.Barcode}
          value={this.state.cardid}
          format={this.state.barcodetype.replace('_', '')}
        />
        {this.state.boolModal && (
          <Modal
            title="Adding card"
            description={
              <Empty
                icon="cozy"
                title={this.state.titleModal}
                text={this.state.textModal}
              />
            }
            dismissAction={() => this.setState({ boolModal: false })}
          />
        )}
        <br />
        <br />
      </form>
    )
  }
}

export default withClient(EditCard)
