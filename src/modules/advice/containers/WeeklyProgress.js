import React, { Component } from 'react'
import { Alert, Image, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { graphql } from 'react-apollo'
import moment from 'moment'
import { NextTestMeal, TimesToTestList } from '../components/NextTest'
import { treatmentPlanQuery, todaysBloodGlucoseQuery } from '../../../graphql'
import { nextPlan } from '../utils/nextTreatmentPlan'
import {
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  LIGHT_THEME_ALT_TEXT_COLOR,
  LIGHT_THEME_TEXT_COLOR,
  SMALL_FONT,
  PRIMARY_COLOR,
} from '../../../constants'
import { Button, InternetError } from '../../../components'
// NOTE: default screen while loading should show todays date and a muted default data state

export class WeeklyProgress extends Component {
  state = {}
  render() {
    const TreatmentPlanWithData = graphql(treatmentPlanQuery, {
      options: { variables: { patientId: this.props.patientId } },
    })(TreatmentPlan)
    return <TreatmentPlanWithData patientId={this.props.patientId} />
  }
}

const TreatmentPlan = ({ data, patientId }) => {
  if (data.error) {
    return (
      <RootView>
        <InternetError error={JSON.stringify(data.error.message)} />
      </RootView>
    )
  }
  if (data.loading) {
    return (
      <RootView>
        <ActivityIndicator animating size="large" color={PRIMARY_COLOR} />
      </RootView>
    )
  }
  if (
    !data.treatmentPlan ||
    !data.treatmentPlan.length ||
    moment().isAfter(data.treatmentPlan[0].endAt)
  ) {
    return (
      <Root>
        <OuterMargin>
          <Margins>
            <Explanation>没有测量作业，可能是因为您还没有在糖尿病共同照护门诊就诊过。</Explanation>
          </Margins>
          <Button
            title="我要预约门诊"
            onPress={() =>
              Alert.alert('谢谢，我们已收到您的门诊预约请求，随后将有护士跟您联系确认', '', [
                {
                  text: '知道了',
                  onPress: () => console.log('should make an appointment here'),
                },
              ])}
          />
        </OuterMargin>
      </Root>
    )
  }
  // get next test day
  const next = nextPlan(data.treatmentPlan, moment())
  const isToday = moment().isSame(next.when, 'day')
  let NextTestList = TimesToTestList
  if (isToday) {
    NextTestList = graphql(todaysBloodGlucoseQuery, {
      options: {
        variables: {
          patientId,
          from: moment()
            .startOf('day')
            .toISOString(),
          to: moment()
            .endOf('day')
            .toISOString(),
        },
      },
    })(NextTestMeal)
  }
  return (
    <RootView>
      <Flex>
        <PlanTitle isToday={isToday} />
      </Flex>
      <FlexThree>
        <NextTestList daysTestTimes={next.plan} when={next.when} />
      </FlexThree>
    </RootView>
  )
}

const Flex = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 8;
`
const FlexThree = styled.View`flex: 3;`
const RootView = styled.View`
  flex: 1;
  background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};
`
const Root = styled.View`flex: 1;`
export const PlanTitle = ({ isToday }) => (
  <CenteredView>
    <SmallTitle>{isToday ? '今天' : '下次'}血糖应测时间</SmallTitle>
  </CenteredView>
)
const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const SmallTitle = styled.Text`
  text-align: center;
  font-size: ${SMALL_FONT};
  color: ${LIGHT_THEME_ALT_TEXT_COLOR};
`
const OuterMargin = styled.View`
  flex: 1;
  margin: 40px 0;
`
const Margins = styled.View`
  flex: 1;
  margin: 0 40px;
`
const Explanation = styled.Text`
  font-size: 18;
  color: ${LIGHT_THEME_TEXT_COLOR};
`
