import React, { Component } from 'react'
import Chip from 'cozy-ui/react/Chip'
import Icon from 'cozy-ui/react/Icon'

import { minDistToLabel } from './levenshteinDistance.js'
import {
  availableConnector,
  installedConnector
} from 'assets/DummyConnector.jsx'

export class KonnectorChecker extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    var matchingConnector = null
    var isConnectorInstalled = false
    var label = this.props.brand
    var connector = []

    label = label.toLowerCase()

    // For each connector available
    var kntr = 0
    while (!matchingConnector && kntr < availableConnector.length) {
      connector = availableConnector[kntr].label.split(' ')

      // For each word in connector
      var iWordKntr = 0
      while (!matchingConnector && iWordKntr < connector.length) {
        const minDist =
          minDistToLabel(connector[iWordKntr], label) /
          connector[iWordKntr].length
        if (minDist <= 0.2) {
          matchingConnector = availableConnector[kntr].label
        }
        iWordKntr++
      }

      kntr++
    }

    isConnectorInstalled = installedConnector.includes(matchingConnector)

    if (matchingConnector && !isConnectorInstalled) {
      return (
        <div>
          <Chip>
            <Icon icon="connector" style={{ marginRight: '0.5rem' }} />
            Connector available
          </Chip>
        </div>
      )
    } else if (matchingConnector && isConnectorInstalled) {
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
