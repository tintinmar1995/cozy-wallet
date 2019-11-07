import React, { Component } from 'react'
import { Modal, ModalContent } from 'cozy-ui/react'
import { Button } from 'cozy-ui/react/Button'
import Avatar from 'cozy-ui/react/Avatar'
import Barcode from 'react-barcode'
import KonnectorChecker from './KonnectorChecker'

export class Card extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { boolModal: false }
  }

  render() {
    const { card } = this.props
    const { boolModal } = this.state

    // Prevent the app from printing an empty card
    if (!card.store) {
      return null
    }

    var out = []
    // The modal contains the barcode and a buttons to delete one card
    if (boolModal) {
      out.push(
        <div>
          <Modal
            title={card.store}
            secondaryAction={() => {
              this.setState({ boolModal: false, cancelling: false })
            }}
          >
            <ModalContent>
              <center>
                <Barcode
                  value={card.cardid}
                  height="100%"
                  format={card.barcodetype.replace('_', '')}
                />
              </center>
              <h4>{card.note}</h4>
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

    // TODO: Use CompositeRow from cozy-ui
    // TODO: Put Edit option and Delete in Dots menu at the left of the row
    // TODO: Edit option create a form Composite button and replace Dots by Save
    // In the main tab, cards are shown as an Avatar and a button to open a modal
    out.push(
      <div style={{ margin: '10px', display: 'flex', flexDirection: 'row' }}>
        <Avatar
          text={(str => {
            if (str) {
              return str.substring(0, 1)
            }
          })(card.store)}
          style={{ marginRight: '10px' }}
        />
        <Button
          onClick={() => this.setState({ boolModal: true })}
          label={card.store}
          size="large"
          theme="ghost"
          extension="narrow"
        />
        <KonnectorChecker brand={card.store} />
      </div>
    )
    return out
  }
}

export default Card
