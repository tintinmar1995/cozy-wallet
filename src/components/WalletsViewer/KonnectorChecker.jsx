import React, { Component } from 'react'
import UIChip from 'cozy-ui/react/Chip'
import { Bd } from 'cozy-ui/react/Media'

import { minDistToLabel } from './levenshteinDistance.js'

const Chip = React.memo(({ children, ...props }) => (
  <UIChip
    variant="outlined"
    className="u-mr-0 u-mb-0"
    size="small"
    children={children}
    {...props}
  />
))

const ChipImage = React.memo(({ src }) => (
  <img className="u-mr-half" src={src} height="50%" />
))

export class KonnectorChecker extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      matchingConnector: [],
      isConnectorInstalled: false,
      checkDone: false
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
            matchingConnector.push(availableConnectors[kntr])
          }
          iWordKntr++
        }

        kntr++
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
          isConnectorInstalled: isConnectorInstalled,
          checkDone: true
        })
      }
    }
  }

  render() {
    const { matchingConnector, isConnectorInstalled } = this.state

    if (!this.state.checkDone) {
      this.checkForConnector()
    }

    if (matchingConnector.length != 0 && !isConnectorInstalled) {
      return (
        <div>
          <Bd className="u-row-xs">
            <Chip>
              <ChipImage
                src={'registry/' + matchingConnector[0].slug.label + '/icon'}
              />
              Connector available
            </Chip>
          </Bd>
        </div>
      )
    } else if (matchingConnector.length != 0 && isConnectorInstalled) {
      return (
        <div>
          <Bd className="u-row-xs">
            <Chip>
              <ChipImage
                src={'registry/' + matchingConnector[0].slug.label + '/icon'}
              />{' '}
              Connected
            </Chip>
          </Bd>
        </div>
      )
    } else {
      return null
    }
  }
}

export default KonnectorChecker
