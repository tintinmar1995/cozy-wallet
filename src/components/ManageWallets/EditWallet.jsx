import React, { Component } from 'react'

import { withClient } from 'cozy-client'
import Button from 'cozy-ui/react/Button'
import { Modal, ModalContent } from 'cozy-ui/react'
import CompositeRow from 'cozy-ui/react/CompositeRow'
import Circle from 'cozy-ui/react/Circle'
import Icon from 'cozy-ui/react/Icon'
import Input from 'cozy-ui/react/Input'

export class EditWallet extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      boolEdit: false,
      newValue: this.props.wallet.label,
      id: this.props.wallet.value,
      name: this.props.wallet.label,
      deleting: false,
      deleted: false
    }
  }

  render() {
    const { boolEdit, newValue, deleting, deleted } = this.state

    if (deleted) {
      return null
    }

    return (
      <div>
        {deleting && (
          <div>
            <Modal
              title="Are you sure, you want to delete this wallet ?"
              secondaryAction={() => {
                this.setState({ deleting: false })
              }}
            >
              <ModalContent>
                <Button
                  type="button"
                  busy={this.state.deletion}
                  theme="danger"
                  label="Confirm"
                  onClick={() => {
                    const { client } = this.props
                    const { id } = this.state
                    client.stackClient
                      .fetchJSON('DELETE', '/files/' + id)
                      .catch(error => {
                        alert(error)
                      })
                    this.setState({ deleting: false, deleted: true })
                  }}
                />
                <Button
                  icon="cross"
                  type="button"
                  theme="secondary"
                  onClick={() => {
                    this.setState({ cancelling: !this.state.cancelling })
                  }}
                  label="Cancel"
                />
              </ModalContent>
            </Modal>
          </div>
        )}

        <CompositeRow
          primaryText={
            boolEdit ? (
              <Input
                value={newValue}
                onChange={event => {
                  this.setState({ newValue: event.target.value })
                }}
              />
            ) : (
              this.state.name
            )
          }
          image={
            <Circle backgroundColor="var(--melon)">
              <Icon icon="wallet" />
            </Circle>
          }
          actions={
            <div>
              {!boolEdit && (
                <Button
                  icon="rename"
                  label="Rename"
                  onClick={() => {
                    this.setState({
                      boolEdit: !this.state.boolEdit,
                      newValue: this.state.name
                    })
                  }}
                />
              )}
              {!boolEdit && <Button disabled icon="share" label="Share" />}
              {!boolEdit && (
                <Button
                  icon="trash"
                  theme="danger"
                  label="Delete"
                  onClick={() => {
                    this.setState({ deleting: !this.state.deleting })
                  }}
                />
              )}
              {boolEdit && (
                <Button
                  label="Save"
                  onClick={async () => {
                    const { client } = this.props
                    if (this.state.name != this.state.newValue) {
                      await client.stackClient
                        .fetchJSON('PATCH', '/files/' + this.state.id, {
                          data: {
                            type: 'io.cozy.files',
                            id: this.state.id,
                            attributes: {
                              type: 'file',
                              name: this.state.newValue + '.csv'
                            }
                          }
                        })
                        .catch(e => {
                          alert(e)
                        })
                    }
                    this.setState({
                      boolEdit: !this.state.boolEdit,
                      name: this.state.newValue
                    })
                  }}
                />
              )}
              {boolEdit && (
                <Button
                  theme="danger"
                  label="Cancel"
                  onClick={() => {
                    this.setState({
                      boolEdit: !this.state.boolEdit,
                      newValue: this.state.name
                    })
                  }}
                />
              )}
            </div>
          }
          style={{
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
            boxSizing: 'border-box',
            margin: '15px'
          }}
        />
      </div>
    )
  }
}

export default withClient(EditWallet)
