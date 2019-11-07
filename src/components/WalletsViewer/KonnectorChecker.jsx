import React, { Component } from 'react'
import Chip from 'cozy-ui/react/Chip'
import Icon from 'cozy-ui/react/Icon'

export class KonnectorChecker extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const matchingConnector = true
    const connectorInstalled = false

    if (matchingConnector && !connectorInstalled) {
      return (
        <div>
          <Chip>
            <Icon icon="connector" style={{ marginRight: '0.5rem' }} />
            Connector available
          </Chip>
        </div>
      )
    } else if (matchingConnector && connectorInstalled) {
      return (
        <div>
          <Chip.Round>
            <Icon icon="check-circle" style={{ color: 'blue' }} />
          </Chip.Round>
        </div>
      )
    } else {
      return null
    }
  }
}

export default KonnectorChecker
