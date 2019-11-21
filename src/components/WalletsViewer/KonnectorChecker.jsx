import React, { Component } from 'react'
import UIChip from 'cozy-ui/react/Chip'
import { Bd } from 'cozy-ui/react/Media'

import { minDistToLabel } from './levenshteinDistance.js'

const Chip = function Chip({ children, ...props }) {
  return (
    <UIChip
      variant="outlined"
      className="u-mr-0 u-mb-0"
      size="small"
      {...props}
    >
      {children}
    </UIChip>
  )
}

const ChipImage = function ChipImage({ src }) {
  return <img className="u-mr-half" src={src} height="50%" />
}

export class KonnectorChecker extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      matchingConnector: [],
      checkDone: false
    }
  }

  checkIfConnectorInstalled(connector) {
    const { installedConnectors } = this.props
    var kntr = 0
    while (kntr < installedConnectors.length) {
      if (installedConnectors[kntr].attributes.slug == connector.slug.label) {
        return true
      } else {
        kntr++
      }
    }
    return false
  }

  checkForConnector = async () => {
    const { availableConnectors, installedConnectors } = this.props
    const label = this.props.brand.toLowerCase()
    var connector = []
    var matchingConnector = []

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
          matchingConnector.isConnectorInstalled = this.checkIfConnectorInstalled(
            matchingConnector[i]
          )
        }
      }

      // Prevent from infinite loop
      if (matchingConnector != this.state.matchingConnector) {
        this.setState({
          matchingConnector: matchingConnector,
          checkDone: true
        })
      }
    }
  }

  render() {
    const { matchingConnector } = this.state

    if (!this.state.checkDone) {
      this.checkForConnector()
    }

    if (matchingConnector.length == 0) {
      return null
    }

    var out = []
    for (var idx = 0; idx < matchingConnector.length; idx++) {
      out.push(
        <div style={{ marginRight: '5px' }}>
          <Bd className="u-row-xs">
            <Chip>
              <ChipImage
                src={'registry/' + matchingConnector[idx].slug.label + '/icon'}
              />
              {(!matchingConnector[idx].isConnectorInstalled &&
                'Connector available') ||
                'Connected'}
            </Chip>
          </Bd>
        </div>
      )
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'horizontally' }}>
        {out}
      </div>
    )
  }
}

export default KonnectorChecker
