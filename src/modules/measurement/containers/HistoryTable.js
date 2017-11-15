import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import moment from 'moment'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import { HistoryTable } from '../components'
import { InternetError } from '../../../components'
import { PRIMARY_COLOR } from '../../../constants'
import { bloodGlucosesAndTreatmentPlansQuery } from '../../../graphql'

function getWeeklyMeasurements({ originMeasurements, treatmentPlan, startOfWeek, endOfWeek }) {
  const weeklyMeasurements = [
    {
      day: '周一',
      dailyMeasurements: [],
      treatmentPlan: treatmentPlan.monday,
      date: moment(startOfWeek).format('MM/DD'),
    },
    {
      day: '周二',
      dailyMeasurements: [],
      treatmentPlan: treatmentPlan.tuesday,
      date: moment(startOfWeek)
        .add(1, 'days')
        .format('MM/DD'),
    },
    {
      day: '周三',
      dailyMeasurements: [],
      treatmentPlan: treatmentPlan.wednesday,
      date: moment(startOfWeek)
        .add(2, 'days')
        .format('MM/DD'),
    },
    {
      day: '周四',
      dailyMeasurements: [],
      treatmentPlan: treatmentPlan.thursday,
      date: moment(startOfWeek)
        .add(3, 'days')
        .format('MM/DD'),
    },
    {
      day: '周五',
      dailyMeasurements: [],
      treatmentPlan: treatmentPlan.friday,
      date: moment(startOfWeek)
        .add(4, 'days')
        .format('MM/DD'),
    },
    {
      day: '周六',
      dailyMeasurements: [],
      treatmentPlan: treatmentPlan.saturday,
      date: moment(startOfWeek)
        .add(5, 'days')
        .format('MM/DD'),
    },
    {
      day: '周日',
      dailyMeasurements: [],
      treatmentPlan: treatmentPlan.sunday,
      date: moment(startOfWeek)
        .add(6, 'days')
        .format('MM/DD'),
    },
  ]

  const measurementsOfThisWeek = originMeasurements.filter(
    ({ measuredAt }) =>
      moment(measuredAt).isSameOrAfter(startOfWeek) && moment(measuredAt).isSameOrBefore(endOfWeek),
  )

  measurementsOfThisWeek.forEach(item => {
    weeklyMeasurements[moment(item.measuredAt).weekday()].dailyMeasurements.push(item)
  })

  return weeklyMeasurements
}

function getTreatmentPlan(treatmentPlan, startOfWeek, endOfWeek) {
  const defaultTestTime = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  }

  const treatmentPlanOfThisWeek = treatmentPlan.find(
    ({ startAt, endAt }) =>
      moment(startOfWeek).isSameOrAfter(startAt) && moment(endOfWeek).isSameOrBefore(endAt),
  )

  const testTimes = treatmentPlanOfThisWeek ? treatmentPlanOfThisWeek.testTimes : defaultTestTime

  return testTimes
}

class _MeasurementHistory extends Component {
  render() {
    const { data, startOfWeek, endOfWeek } = this.props
    if (data.error) return <InternetError error={JSON.stringify(data.error.message)} />
    if (data.loading) {
      return <ActivityIndicator animating size="large" color={PRIMARY_COLOR} />
    }
    const treatmentPlan = getTreatmentPlan(
      data.bloodGlucoseMeasurementsAndTreatmentPlans.treatmentPlans,
      startOfWeek,
      endOfWeek,
    )
    const weeklyMeasurements = getWeeklyMeasurements({
      originMeasurements: data.bloodGlucoseMeasurementsAndTreatmentPlans.bloodGlucoseMeasurements,
      treatmentPlan,
      startOfWeek,
      endOfWeek,
    })
    return <HistoryTable weeklyMeasurements={weeklyMeasurements} />
  }
}

const mapStateToProps = state => ({ patientId: state.appData.patientId })

const mapDispatchToProps = () => ({})

const HistoryScreenWithData = graphql(bloodGlucosesAndTreatmentPlansQuery, {
  options: props => ({
    variables: { patientId: props.patientId },
  }),
})(_MeasurementHistory)

export const MeasurementHistory = connect(mapStateToProps, mapDispatchToProps)(
  HistoryScreenWithData,
)
