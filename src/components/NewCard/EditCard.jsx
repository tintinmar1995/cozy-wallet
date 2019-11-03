import React, { Component } from 'react'
import { Button } from 'cozy-ui/react/Button'
import Barcode from 'react-barcode'
import Label from 'cozy-ui/react/Label'
import Input from 'cozy-ui/react/Input'

import { withClient } from 'cozy-client'

export class EditCard extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      store: '',
      note: '',
      cardid: '',
      barcodetype: '',
      busy: false
    }
  }

  addCard = async () => {
    const { client } = this.props
    const templateNewLine =
      '[**ID**],[**STORE**],[**NOTE**],[**CARDID**],-416706,-1,[**TYPE**]\r\n'

    this.setState({ busy: true })

    // Create new file
    const newFile = await client.stackClient
      .fetchJSON(
        'GET',
        '/files/download?Path=/Wallet/LoyaltyCardKeychain.csv&Dl=1'
      )
      .then(response => {
        var newLine = templateNewLine
          .replace('[**ID**]', response.split('\n').length)
          .replace('[**NOTE**]', this.state.note)
          .replace('[**STORE**]', this.state.store)
          .replace('[**CARDID**]', this.state.cardid)
          .replace('[**TYPE**]', this.state.barcodetype)
        return response + newLine
      })
      .catch(error => {
        alert(error)
      })

    // Get file's id
    const fileID = await client.stackClient
      .fetchJSON('GET', '/files/metadata?Path=/Wallet/LoyaltyCardKeychain.csv')
      .then(response => {
        return response.data.id
      })
      .catch(error => {
        alert(error)
      })

    // Update the file in Cozy Drive
    client.stackClient
      .fetchJSON('PUT', '/files/' + fileID, newFile)
      .then(response => {
        return JSON.stringify(response.data.id)
      })
      .catch(error => {
        alert(error)
      })

    this.setState({
      store: '',
      note: '',
      cardid: '',
      barcodetype: '',
      busy: false
    })
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
              if (event.target.value.length == 8) {
                this.setState({
                  cardid: event.target.value,
                  barcodetype: 'EAN8'
                })
              } else if (event.target.value.length == 13) {
                this.setState({
                  cardid: event.target.value,
                  barcodetype: 'EAN13'
                })
              } else {
                this.setState({
                  cardid: event.target.value,
                  barcodetype: 'CODE128'
                })
              }
            }}
          />
        </div>
        <br />
        <Barcode
          value={this.state.cardid}
          format={this.state.barcodetype.replace('_', '')}
        />
      </form>
    )
  }
}

export default withClient(EditCard)
