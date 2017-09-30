import React, { Component } from 'react'
import moment from 'moment'

import { goal } from '../modules/measurement/utils/goal'
import { ManualRecord } from '../modules/measurement/containers/ManualRecord'
import {
  PRIMARY_COLOR,
  DigestiveStateLabel,
  LIGHT_GREEN,
  DARK_RED,
  LIGHT_ORANGE,
} from '../constants'

const BloodSugarLabel = {
  lower: DARK_RED,
  upper: LIGHT_ORANGE,
  normal: LIGHT_GREEN,
}

function getBloodSugarLabel(result, digestiveState) {
  if (!digestiveState || !result) return PRIMARY_COLOR

  const goalUpperLimit = goal[digestiveState].upper
  const goalLowerLimit = goal[digestiveState].lower

  if (result < goalLowerLimit) return BloodSugarLabel.lower
  if (result > goalUpperLimit) return BloodSugarLabel.upper
  return BloodSugarLabel.normal
}

export class ManualRecordScreen extends Component {
  static navigationOptions = ({ screenProps }) => {
    const { manualRecord } = screenProps
    const { measureResult, digestiveState, measuredAt } = manualRecord

    return {
      title: measureResult
        ? `${moment(measuredAt).format('MM月DD日 HH:mm')} ${DigestiveStateLabel[digestiveState]}`
        : '手动录入',
      headerStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        backgroundColor: getBloodSugarLabel(measureResult, digestiveState),
      },
    }
  }

  render() {
    return <ManualRecord navigation={this.props.navigation} />
  }
}
