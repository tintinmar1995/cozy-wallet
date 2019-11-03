import React, { Component } from 'react'
import { Modal, ModalContent } from 'cozy-ui/react'
import { Button } from 'cozy-ui/react/Button'
import Papa from 'papaparse'
import Avatar from 'cozy-ui/react/Avatar'
import Barcode from 'react-barcode'

export class Card extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { boolModal: false }
  }

  render() {
    const { data } = this.props
    const { boolModal } = this.state

    var out = []

    if (!data.store) {
      return null
    }

    if (boolModal) {
      out.push(
        <div>
          <Modal
            title={data.store}
            secondaryAction={() => {
              this.setState({ boolModal: false, cancelling: false })
            }}
          >
            <ModalContent>
              <center>
                <Barcode
                  value={data.cardid}
                  height="100%"
                  format={data.barcodetype.replace('_', '')}
                />
              </center>
              <br />
              <br />
              <div>
                <Button
                  icon="trash"
                  busy={this.state.cancelling}
                  type="button"
                  theme="danger"
                  onClick={() => {
                    this.setState({ cancelling: !this.state.cancelling })
                  }}
                  size="tiny"
                  label="Delete"
                />
                {this.state.cancelling && (
                  <Button
                    type="button"
                    theme="danger"
                    size="tiny"
                    label="Confirm"
                    onClick={() => {
                      this.setState({ boolModal: false })
                      this.props.onClick(this.props.id)
                    }}
                  />
                )}
                {this.state.cancelling && (
                  <Button
                    icon="cross"
                    type="button"
                    theme="secondary"
                    size="tiny"
                    onClick={() => {
                      this.setState({ cancelling: !this.state.cancelling })
                    }}
                    label="Cancel"
                  />
                )}
              </div>
            </ModalContent>
          </Modal>
        </div>
      )
    }
    out.push(
      <div style={{ margin: '10px' }}>
        <Avatar
          text={(str => {
            if (str) {
              return str.substring(0, 1)
            }
          })(data.store)}
          style={{ marginRight: '10px' }}
        />
        <Button
          onClick={() => this.setState({ boolModal: true })}
          label={data.store}
          size="large"
          theme="ghost"
          extension="narrow"
        />
      </div>
    )
    return out
  }
}

export default Card
