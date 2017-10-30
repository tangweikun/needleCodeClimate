import React, { Component } from 'react'
import moment from 'moment'
import { ManualRecord } from '../modules/measurement/containers/ManualRecord'
import { DigestiveStateLabel } from '../constants'
import { getColorOfBloodSugarLevel } from '../utils/colorOfBloodSugarLevel'

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
        backgroundColor: getColorOfBloodSugarLevel(measureResult, digestiveState),
      },
    }
  }

  render() {
    return <ManualRecord navigation={this.props.navigation} />
  }
}
