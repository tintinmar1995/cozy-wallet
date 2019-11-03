import React, { Component } from 'react'
import { Modal, ModalContent } from 'cozy-ui/react'
import { Button } from 'cozy-ui/react/Button'
import Avatar from 'cozy-ui/react/Avatar'
import Barcode from 'react-barcode'

export class Card extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { boolModal: false }
    this.canvas = []
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
              this.setState({ boolModal: false })
            }}
          >
            <ModalContent>
              <center>
                <Barcode
                  value={data.cardid}
                  options={{ format: data.barcodetype }}
                />
              </center>
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
