import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { WaitingForResult } from '../components'
import { MeasureDefault, MeasureError, MeasureSuccess } from '../modules/measurement/components'
import { resetDevice } from '../ducks/actions'
import { ACTION_BG1_MEASURE_GET_BLOOD } from '../modules/measurement/utils/SDK'
import { goal } from '../modules/measurement/utils/goal'
import {
  LIGHT_GREEN,
  DARK_RED,
  PRIMARY_COLOR,
  DigestiveStateLabel,
  LIGHT_ORANGE,
} from '../constants'

// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: 'First' })],
// })

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

class _MeasureScreen extends Component {
  static navigationOptions = ({ screenProps }) => {
    const { measureResult, digestiveState } = screenProps

    return {
      title: measureResult
        ? `${moment().format('MM月DD日 HH:mm')} ${DigestiveStateLabel[digestiveState]}`
        : '测血糖',
      headerStyle: {
        justifyContent: 'center',
        borderBottomWidth: 0,
        backgroundColor: getBloodSugarLabel(measureResult, digestiveState),
      },
    }
  }

  componentDidMount() {
    this.props.resetDevice()
  }

  goAskTab = () => {
    this.props.navigation.navigate('Chat', { patientId: this.props.appData.patientId })
  }

  render() {
    const { appData } = this.props
    const { digestiveState, fail, success, measureResult, latestEvent, patientState } = appData
    if (fail) {
      return <MeasureError />
    }

    if (digestiveState) {
      if (latestEvent === ACTION_BG1_MEASURE_GET_BLOOD) {
        return <WaitingForResult />
      }
      if (success) {
        return (
          <MeasureSuccess
            patientState={patientState}
            measureResult={measureResult}
            digestiveState={digestiveState}
            goAskTab={this.goAskTab}
          />
        )
      }
    }

    return <MeasureDefault digestiveState={digestiveState} latestEvent={latestEvent} />
  }
}

function mapStateToProps(state) {
  return {
    appData: state.appData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetDevice: () => dispatch(resetDevice()),
  }
}

export const MeasureScreen = connect(mapStateToProps, mapDispatchToProps)(_MeasureScreen)
