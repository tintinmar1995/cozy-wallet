import React, { Component } from 'react'
import Chip from 'cozy-ui/react/Chip'
import Icon from 'cozy-ui/react/Icon'

import { minDistToLabel } from './levenshteinDistance.js'

export class KonnectorChecker extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      matchingConnector: [],
      isConnectorInstalled: false
    }
  }

  checkForConnector = async () => {
    const { availableConnectors, installedConnectors } = this.props
    const label = this.props.brand.toLowerCase()
    var connector = []
    var matchingConnector = []
    var isConnectorInstalled = false

    if (availableConnectors.length != 0) {
      // For each connector available
      var kntr = 0
      while (kntr < availableConnectors.length) {
        if (availableConnectors[kntr].name) {
          connector = availableConnectors[kntr].name.label.split(' ')
        } else {
          connector = availableConnectors[kntr].slug.label.split(' ')
        }

        // For each word in connector
        var iWordKntr = 0
        while (iWordKntr < connector.length) {
          const minDist =
            minDistToLabel(connector[iWordKntr], label) /
            connector[iWordKntr].length
          if (minDist <= 0.3) {
            matchingConnector.push({ label: connector.join(' ') })
          }
          iWordKntr++
        }

        kntr++
      }
    }

    // For each connector that match, check if installed
    // TODO: Adapt this part to the real response
    if (installedConnectors.length != 0) {
      for (var i = 0; i < matchingConnector.length; i) {
        isConnectorInstalled = installedConnectors.includes(
          matchingConnector[i]
        )
      }
    }

    // Prevent from infinite loop
    if (
      matchingConnector != this.state.matchingConnector ||
      isConnectorInstalled != this.state.isConnectorInstalled
    ) {
      this.setState({
        matchingConnector: matchingConnector,
        isConnectorInstalled: isConnectorInstalled
      })
    }
  }

  render() {
    const { matchingConnector, isConnectorInstalled } = this.state

    this.checkForConnector()

    if (matchingConnector.length != 0 && !isConnectorInstalled) {
      return (
        <div>
          <Chip>
            <Icon icon="connector" style={{ marginRight: '0.5rem' }} />
            Connector available
          </Chip>
        </div>
      )
    } else if (matchingConnector.length != 0 && isConnectorInstalled) {
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
