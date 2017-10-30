import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { WaitingForResult } from '../components'
import { MeasureDefault, MeasureError, MeasureSuccess } from '../modules/measurement/components'
import { resetDevice } from '../ducks/actions'
import { ACTION_BG1_MEASURE_GET_BLOOD } from '../modules/measurement/utils/SDK'
import { DigestiveStateLabel } from '../constants'
import { getColorOfBloodSugarLevel } from '../utils/colorOfBloodSugarLevel'

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
        backgroundColor: getColorOfBloodSugarLevel(measureResult, digestiveState),
      },
    }
  }

  componentDidMount() {
    this.props.resetDevice()
  }

  render() {
    const {
      digestiveState,
      fail,
      success,
      measureResult,
      latestEvent,
      patientState,
      patientId,
    } = this.props.appData
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
            goAskTab={routeName => this.props.navigation.navigate(routeName, { patientId })}
          />
        )
      }
    }

    return <MeasureDefault digestiveState={digestiveState} latestEvent={latestEvent} />
  }
}

const mapStateToProps = state => ({ appData: state.appData })

const mapDispatchToProps = dispatch => ({ resetDevice: () => dispatch(resetDevice()) })

export const MeasureScreen = connect(mapStateToProps, mapDispatchToProps)(_MeasureScreen)
