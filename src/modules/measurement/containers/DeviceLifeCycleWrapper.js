import React from 'react'
import { View, StatusBar } from 'react-native'
import { graphql } from 'react-apollo'
import { get } from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { uri } from '../../../endpoint'
import { measureError, measureSuccess, measureEvent } from '../../../ducks/actions'
// import Navigation from '../../../modules/Navigator'
import AppNavigation from '../../Navigator'
import {
  startDiscovery,
  stopDiscovery,
  eventSequence,
  requestMeasurement,
  getChinaMeasurementFromResponse,
  getUSMeasurementFromResponse,
  connectToBG1,
  getErrorCodeFromResponse,
  Event_Scan_Device,
  Event_Device_Connected,
  ACTION_BG1_MEASURE_ERROR,
  ACTION_BG1_MEASURE_RESULT,
  Event_Notify,
} from '../utils/SDK'
import { getUsefulDeviceContext } from '../../../utils/deviceContext'
import { FloatingEventLog } from '../../../components'
import {
  saveBloodGlucoseMeasurement,
  bloodGlucosesAndTreatmentPlansQuery,
  todaysBloodGlucoseQuery,
} from '../../../graphql'

const getEventName = response => {
  if (response.eventName === Event_Notify) {
    return response.action
  }
  return response.eventName
}
const getEventNameWithErrorCode = response => {
  if (response.eventName === Event_Notify) {
    if (response.action !== 'action_measure_error_for_bg1') return response.action
    return `${response.action} error code: ${getErrorCodeFromResponse(response)}`
  }
  return response.eventName
}
class _Wrapper extends React.Component {
  constructor(props) {
    super(props)
    const devMode = process && process.env && process.env.NODE_ENV === 'development'
    this.state = {
      devMode,
      events: [],
    }
  }
  componentDidMount() {
    this.addListener()
    stopDiscovery()
    startDiscovery()
  }

  componentWillUnmount() {
    stopDiscovery()
  }

  uploadResult = async response => {
    const { patientId, digestiveState } = this.props.appData

    // TODO(tangweikun) prevent user uploadResult without digestive state
    if (!digestiveState) return

    const value = getChinaMeasurementFromResponse(response)
    this.props.measureSuccess(value)
    const bloodGlucose = { value: getUSMeasurementFromResponse(response), unit: 'mg/dL' }
    const device = getUsefulDeviceContext()
    let deviceContext = {
      ...device,
      buildNumber: +device.buildNumber,
      appName: 'NEEDLE',
    }

    const getCurrentPosition = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        location => {
          resolve(location)
        },
        error => reject(error),
      )
    })

    await getCurrentPosition
      .then(location => {
        const coords = get(location, 'coords', {})
        const { latitude, longitude } = coords
        deviceContext = {
          ...deviceContext,
          latitude,
          longitude,
        }
      })
      .catch(error => console.log(error))

    this.props.mutate({
      variables: {
        patientId,
        bloodGlucose,
        digestiveState,
        measuredAt: moment().toISOString(),
        deviceContext,
      },
    })
  }

  errorHandler(response) {
    this.props.measureError(response)
    fetch(`${uri}log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'BG1 error',
        errorCode: getErrorCodeFromResponse(response),
        device: getUsefulDeviceContext(),
      }),
    })
  }
  addListener() {
    const events$ = eventSequence()
    // NOTE: updates latest event state
    events$.subscribe(x => this.props.measureEvent(getEventName(x)))
    // NOTE: sends requests to bg1 on specific events, throttled by 2 seconds between requests
    events$
      .filter(x => x.eventName === Event_Scan_Device)
      .throttleTime(2000)
      .subscribe(() => connectToBG1())
    events$
      .filter(x => x.eventName === Event_Device_Connected)
      .throttleTime(2000)
      .subscribe(() => requestMeasurement())
    // NOTE: updates error state
    events$
      .filter(x => getEventName(x) === ACTION_BG1_MEASURE_ERROR)
      .subscribe(x => this.errorHandler(x))
    // NOTE: updates success state and uploads result
    events$
      .filter(x => getEventName(x) === ACTION_BG1_MEASURE_RESULT)
      .subscribe(x => this.uploadResult(x))

    // TODO: log to state for display in a debug area
    events$.subscribe(x =>
      this.setState({ events: [...this.state.events, getEventNameWithErrorCode(x)] }),
    )
    // NOTE: logs everything to the console
    // events$.subscribe(x => console.log(JSON.stringify(x)))
  }

  // onFail = response => {
  //   const errorCode = getErrorCodeFromResponse(response)
  //   const errorState = getDeviceStateByErrorCode(errorCode)
  //   if (errorCode === 4 || errorCode === 8) requestMeasurement()
  //   else this.updateDeviceState(errorState)
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <AppNavigation
          screenProps={{
            patientId: this.props.appData.patientId,
            manualRecord: this.props.appData.manualRecord,
            digestiveState: this.props.appData.digestiveState,
            measureResult: this.props.appData.measureResult,
          }}
        />
        {this.props.appData.devMode && (
          <FloatingEventLog events={this.state.events} env={this.props.appData.env} />
        )}
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    appData: state.appData,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    measureError: g => dispatch(measureError(g)),
    measureSuccess: g => dispatch(measureSuccess(g)),
    measureEvent: g => dispatch(measureEvent(g)),
  }
}

const WrapperWithSave = graphql(saveBloodGlucoseMeasurement, {
  options: props => ({
    refetchQueries: [
      {
        query: bloodGlucosesAndTreatmentPlansQuery,
        variables: {
          patientId: props.appData.patientId,
        },
      },
      {
        query: todaysBloodGlucoseQuery,
        variables: {
          patientId: props.appData.patientId,
          from: moment()
            .startOf('day')
            .toISOString(),
          to: moment()
            .endOf('day')
            .toISOString(),
        },
      },
    ],
  }),
})(_Wrapper)
export default connect(mapStateToProps, mapDispatchToProps)(WrapperWithSave)
