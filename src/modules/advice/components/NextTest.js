import React from 'react'
import styled from 'styled-components/native'
import moment from 'moment'
import { ActivityIndicator } from 'react-native'
import {
  LIGHT_THEME_MUTED_TEXT_COLOR,
  REGULAR_FONT,
  LIGHT_THEME_ALT_TEXT_COLOR,
  LIGHT_THEME_TEXT_COLOR,
  SMALL_FONT,
  DigestiveStateLabel,
  PRIMARY_COLOR,
} from '../../../constants'
import { convertBloodGlucoseObjectToMMOLString } from '../../../modules/measurement/utils/convertUnit'

const Flex = styled.View`flex: 1;`

export const NextTestMeal = ({ data, daysTestTimes, when }) => {
  if (data.error) return <Title>{JSON.stringify(data.error.message)}</Title>
  if (data.loading) return <ActivityIndicator animating size="large" color={PRIMARY_COLOR} />

  const todaysMeasurements = data.bloodGlucoseMeasurements.filter(x =>
    moment().isSame(x.measuredAt, 'day'),
  )
  const d = daysTestTimes.map(testTime => {
    const measurementsAtThisTestTime = todaysMeasurements.find(y => y.digestiveState === testTime)
    let bloodGlucose = {}
    if (measurementsAtThisTestTime) bloodGlucose = measurementsAtThisTestTime.bloodGlucose
    return { bloodGlucose, testTime }
  })
  return <TimesToTestList when={when} daysTestTimes={d} />
}

export const TimesToTestList = ({ daysTestTimes, when }) => (
  <Scroller>
    <Title>
      {moment(when).format('MMMDo')} {moment(when).format('ddd')}
    </Title>
    {daysTestTimes.map((x, i) => (
      <Centered key={i}>
        <Divider />
        <NextMeasurements
          meal={DigestiveStateLabel[x.testTime] || DigestiveStateLabel[x]}
          bloodGlucose={x.bloodGlucose}
        />
      </Centered>
    ))}
  </Scroller>
)
export const NextMeasurements = ({ meal, bloodGlucose }) => (
  <CenteredRow>
    <Flex>
      <MutedBoldLabel>{meal}</MutedBoldLabel>
    </Flex>
    <Flex>
      {bloodGlucose && bloodGlucose.value ? (
        <BoldValue>
          {convertBloodGlucoseObjectToMMOLString(bloodGlucose)} <SmallUnit>mmol/L</SmallUnit>
        </BoldValue>
      ) : (
        <Bold>待测量</Bold>
      )}
    </Flex>
  </CenteredRow>
)
const Centered = styled.View`
  justify-content: center;
  align-items: center;
`
const Scroller = styled.ScrollView``
const CenteredRow = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`
const Title = styled.Text`
  text-align: center;
  font-size: ${REGULAR_FONT};
  color: ${LIGHT_THEME_ALT_TEXT_COLOR};
`

const Divider = styled.View`
  height: 2;
  width: 180;
  margin: 10px;
  background-color: lightgray;
`
const BoldValue = styled.Text`
  margin-left: 5;
  font-weight: bold;
  font-size: ${REGULAR_FONT};
  color: ${LIGHT_THEME_TEXT_COLOR};
`
const MutedBoldLabel = styled.Text`
  margin-right: 5;
  text-align: right;
  font-weight: bold;
  font-size: ${REGULAR_FONT};
  color: ${LIGHT_THEME_MUTED_TEXT_COLOR};
`
const Bold = styled.Text`
  margin-left: 5;
  font-weight: bold;
  font-size: ${REGULAR_FONT};
  color: ${LIGHT_THEME_TEXT_COLOR};
`
const SmallUnit = styled.Text`
  margin-left: 5;
  font-weight: normal;
  font-size: ${SMALL_FONT};
  color: ${LIGHT_THEME_TEXT_COLOR};
`
