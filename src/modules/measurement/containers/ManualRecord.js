import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { get } from 'lodash'

import {
  saveBloodGlucoseMeasurement,
  bloodGlucosesAndTreatmentPlansQuery,
  todaysBloodGlucoseQuery,
} from '../../../graphql'
import { inputValidation } from '../utils/inputValidation'
import { MeasureSuccess } from '../components'
import { getDeviceContext } from '../../../utils/deviceContext'
import { saveManualRecord, resetManualRecord } from '../../../ducks/actions'

import { SelectBloodGlucoseMeasurement, SelectDigestiveState } from '../components/ManualRecord'

export class _ManualRecord extends Component {
  state = {
    digestiveState: '',
    inputValue: '',
    isSave: false,
    date: new Date(),
  }

  onPress = digestiveState => this.setState({ digestiveState })

  uploadResult = async () => {
    const { inputValue, digestiveState, date } = this.state
    if (!inputValue) return
    this.props.saveManualRecord(digestiveState, inputValue.replace(/\.$/, ''), date)

    const bloodGlucose = { value: inputValue.replace(/\.$/, ''), unit: 'mmol/L' }
    const { patientId } = this.props
    const device = getDeviceContext()
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
        measuredAt: moment(date).toISOString(),
        deviceContext,
      },
    })

    this.setState({ isSave: true })
  }

  validateInput = keyText => {
    const { inputValue } = this.state
    return inputValidation(inputValue, keyText)
  }

  handleChange = keyText => {
    this.setState({ inputValue: this.validateInput(keyText) })
  }

  handleChangeDate = date => {
    this.setState({ date })
  }

  componentDidMount() {
    this.props.resetManualRecord()
  }

  render() {
    const { digestiveState, inputValue, isSave, date } = this.state
    const { navigation, patientState } = this.props

    if (isSave) {
      return (
        <MeasureSuccess
          patientState={patientState}
          measureResult={inputValue.replace(/\.$/, '')}
          digestiveState={digestiveState}
          measuredAt={date}
          goAskTab={() => navigation.navigate('Chat', { patientId: this.props.patientId })}
        />
      )
    }
    if (digestiveState) {
      return (
        <SelectBloodGlucoseMeasurement
          inputValue={inputValue}
          digestiveState={digestiveState}
          handleChange={this.handleChange}
          uploadResult={this.uploadResult}
          selectedDate={this.state.date}
        />
      )
    }
    return (
      <SelectDigestiveState
        onPress={this.onPress}
        handleChangeDate={this.handleChangeDate}
        selectedDate={this.state.date}
      />
    )
  }
}

const mapStateToProps = state => ({
  patientId: state.appData.patientId,
  manualRecord: state.appData.manualRecord,
  patientState: state.appData.patientState,
})

const mapDispatchToProps = dispatch => ({
  saveManualRecord: (digestiveState, measureResult, measuredAt) =>
    dispatch(saveManualRecord(digestiveState, measureResult, measuredAt)),
  resetManualRecord: () => dispatch(resetManualRecord()),
})

const ManualRecordWithSave = graphql(saveBloodGlucoseMeasurement, {
  options: props => ({
    refetchQueries: [
      {
        query: bloodGlucosesAndTreatmentPlansQuery,
        variables: {
          patientId: props.patientId,
        },
      },
      {
        query: todaysBloodGlucoseQuery,
        variables: {
          patientId: props.patientId,
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
})(_ManualRecord)

export const ManualRecord = connect(mapStateToProps, mapDispatchToProps)(ManualRecordWithSave)
