import React from 'react'
import { View, Dimensions, Text } from 'react-native'
import styled from 'styled-components/native'
import { BORDER_COLOR, DigestiveStateLabel, MINI_FONT } from '../../../constants'
import { ContentCell } from './ContentCell'

const MEAL_LABEL = ['早餐', '午餐', '晚餐']

export const HistoryTable = ({ weeklyMeasurements }) => (
  <View>
    <View style={{ flexDirection: 'column' }}>
      <Row>
        <Cell colSpan={2} isFarLeft isFarTop>
          <HeaderText>星期</HeaderText>
        </Cell>
        {MEAL_LABEL.map((item, index) => (
          <Cell rowSpan={2} colSpan={2} isFarTop key={index}>
            <SecondLevelCell rowSpan={2}>
              <HeaderText>{item}</HeaderText>
            </SecondLevelCell>
            <SecondLevelCell rowSpan={2} isFarBottom>
              <SecondLevelCell isFarBottom>
                <HeaderText>前</HeaderText>
              </SecondLevelCell>
              <SecondLevelCell isFarRight isFarBottom>
                <HeaderText>后</HeaderText>
              </SecondLevelCell>
            </SecondLevelCell>
          </Cell>
        ))}
        <Cell colSpan={2}>
          <HeaderText>睡前</HeaderText>
        </Cell>
        <Cell colSpan={2} isFarTop>
          <HeaderText>凌晨</HeaderText>
        </Cell>
      </Row>

      {weeklyMeasurements.map(({ day, dailyMeasurements, treatmentPlan, date }, index) => (
        <Row key={day}>
          <Cell isFarLeft isFarBottom={index === 6}>
            <CenterText>{day}</CenterText>
            <Text style={{ fontSize: MINI_FONT, textAlign: 'center', color: 'rgba(0, 0, 0, .6)' }}>
              {date}
            </Text>
          </Cell>
          {Object.keys(DigestiveStateLabel).map((digestiveState, i) => (
            <ContentCell
              key={i}
              isFarBottom={index === 6}
              treatmentPlan={treatmentPlan}
              digestiveState={digestiveState}
              dailyMeasurements={dailyMeasurements}
            />
          ))}
        </Row>
      ))}
    </View>
  </View>
)

const BASIC_LENGTH = Dimensions.get('screen').width / 9

// colSpan rowSpan isFarLeft isFarTop
const Cell = styled.View`
  justify-content: center;
  height: ${({ colSpan = 1 }) => colSpan * BASIC_LENGTH};
  width: ${({ rowSpan = 1 }) => rowSpan * BASIC_LENGTH};
  border-left-width: ${({ isFarLeft }) => (isFarLeft ? 1 : 0)};
  border-bottom-width: ${({ isFarBottom }) => (isFarBottom ? 1 : 0)};
  border-right-width: 1;
  border-top-width: 1;
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  border-color: rgba(227, 227, 227, 1);
`

const Row = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
`

const SecondLevelCell = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${({ colSpan = 1 }) => colSpan * BASIC_LENGTH};
  width: ${({ rowSpan = 1 }) => rowSpan * BASIC_LENGTH};
  border-right-width: ${({ isFarRight }) => (isFarRight ? 0 : 1)};
  border-bottom-width: ${({ isFarBottom }) => (isFarBottom ? 0 : 1)};
  border-color: ${BORDER_COLOR};
`

const HeaderText = styled.Text`
  text-align: center;
  color: #2d2d2d;
  font-weight: bold;
`

const CenterText = styled.Text`
  text-align: center;
  color: ${({ color }) => color || '#616161'};
  font-weight: bold;
`
