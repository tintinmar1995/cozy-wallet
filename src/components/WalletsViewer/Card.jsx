import React, { Component } from 'react'
import Barcode from 'react-barcode'
import Avatar from 'cozy-ui/react/Avatar'
import { Button } from 'cozy-ui/react/Button'
import CompositeRow from 'cozy-ui/react/CompositeRow'
import Modal, { ModalContent } from 'cozy-ui/transpiled/react/Modal'
import KonnectorChecker from './KonnectorChecker'

export class Card extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { boolModal: false, cancelling: false, deletion: false }
  }

  render() {
    const { card } = this.props
    const { boolModal, cancelling } = this.state

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
                  format={card.barcodetype.replace('_', '')}
                />
              </center>
            </ModalContent>
          </Modal>
        </div>
      )
    }

    if (cancelling) {
      out.push(
        <div>
          <Modal
            title="Are you sure, you want to delete this card ?"
            secondaryAction={() => {
              this.setState({ cancelling: false })
            }}
          >
            <ModalContent>
              <Button
                type="button"
                busy={this.state.deletion}
                theme="danger"
                label="Confirm"
                onClick={() => {
                  this.setState({
                    cancelling: !this.state.cancelling,
                    deletion: true
                  })
                  this.props.onClick(this.props.id)
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
      )
    }

    // In the main tab, cards are shown as an Avatar and a button to open a modal
    out.push(
      <div style={{ margin: '15px' }}>
        <CompositeRow
          primaryText={card.store}
          secondaryText={card.note}
          image={
            <Avatar
              text={(str => {
                if (str) {
                  return str.substring(0, 1)
                }
              })(card.store)}
              style={{ marginRight: '10px' }}
            />
          }
          right={
            <div>
              <Button
                label="See barcode"
                theme="ghost"
                onClick={() => {
                  this.setState({ boolModal: true })
                }}
              />
              <Button
                iconOnly
                extension="narrow"
                icon="trash"
                theme="danger"
                onClick={() => {
                  this.setState({ cancelling: true })
                }}
              />
            </div>
          }
          actions={
            <KonnectorChecker
              brand={card.store}
              availableConnectors={this.props.availableConnectors}
              installedConnectors={this.props.installedConnectors}
            />
          }
          dense={false}
          style={{
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
            boxSizing: 'border-box'
          }}
        />
      </div>
    )

    return out
  }
}

export default Card
