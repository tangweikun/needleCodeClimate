import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import styled from 'styled-components/native'
import moment from 'moment'
import { ActivityIndicator } from 'react-native'
import { treatmentPlanQuery } from '../../../graphql'
import {
  DigestiveStateLabel,
  DayLabel,
  LIGHT_THEME_GRAY_TEXT_COLOR,
  LIGHT_THEME_BACKGROUND_COLOR,
  LIGHT_THEME_ALT_TEXT_COLOR,
  PRIMARY_COLOR,
} from '../../../constants'
import { InternetError } from '../../../components'

export class MeasureDays extends Component {
  state = {}
  render() {
    const MeasureDaysWithData = graphql(treatmentPlanQuery, {
      options: { variables: { patientId: this.props.patientId } },
    })(MeasureDaysThingymajig)
    return <MeasureDaysWithData patientId={this.props.patientId} />
  }
}
const Flex = styled.View``
const MeasureDaysThingymajig = ({ data }) => {
  if (data.error) return <InternetError error={JSON.stringify(data.error)} />
  if (data.loading) return <ActivityIndicator animating size="large" color={PRIMARY_COLOR} />

  if (!data.treatmentPlan.length || moment().isAfter(data.treatmentPlan[0].endAt)) {
    return null
  }

  return (
    <White>
      <Left>
        <Label>测量</Label>
      </Left>
      <Right>
        <Regular>您本周应该测量的血糖是</Regular>
        <Flex>
          {measureDays(data.treatmentPlan[0].testTimes).map((x, i) => (
            <Regular key={i}>{displayMeasureTimes(x[0], x[1])}</Regular>
          ))}
        </Flex>
      </Right>
    </White>
  )
}

const measureDays = times =>
  Object.entries(times)
    .filter(x => x[1].length)
    .filter(x => typeof x[1] !== 'string')

const displayMeasureTimes = (day, times) =>
  `${DayLabel[day]}:  ${digestiveStateArrayToString(times)}`
const digestiveStateArrayToString = array => array.map(x => DigestiveStateLabel[x]).join(',  ')
const Regular = styled.Text`
  font-size: 16;
  margin-bottom: 5;
  color: ${LIGHT_THEME_GRAY_TEXT_COLOR};
`

const White = styled.View`
  flex-direction: row;
  padding: 20px 20px 10px;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`

const Left = styled.View`
  flex: 2;
  justify-content: flex-start;
`
const Right = styled.View`
  flex: 7;
  justify-content: flex-start;
`

const Label = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${LIGHT_THEME_ALT_TEXT_COLOR};
`
