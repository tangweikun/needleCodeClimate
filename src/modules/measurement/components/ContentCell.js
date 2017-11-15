import React from 'react'
import { Dimensions } from 'react-native'
import { isEqual } from 'lodash'
import styled from 'styled-components/native'
import { getColorOfBloodSugarLevel } from '../../../utils/colorOfBloodSugarLevel'
import { convertToMMOLString } from '../utils/convertUnit'

function getCellText(digestiveState, dailyMeasurements) {
  const measurement = dailyMeasurements.find(item => item.digestiveState === digestiveState)
  const cellText = measurement && convertToMMOLString(measurement.bloodGlucose.value)
  return cellText
}

export class ContentCell extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (isEqual(this.props, nextProps)) return false

    return true
  }

  render() {
    const { isFarBottom, digestiveState, dailyMeasurements, treatmentPlan } = this.props
    return (
      <Cell
        isFarBottom={isFarBottom}
        weatherMust={treatmentPlan.includes(digestiveState)}
        result={getCellText(digestiveState, dailyMeasurements)}
        backgroundColor={treatmentPlan.includes(digestiveState) && '#E0EAF4'}
      >
        <CenterText
          color={getColorOfBloodSugarLevel(
            getCellText(digestiveState, dailyMeasurements),
            digestiveState,
            '#616161',
          )}
        >
          {getCellText(digestiveState, dailyMeasurements) ||
            (treatmentPlan.includes(digestiveState) && '未测')}
        </CenterText>
      </Cell>
    )
  }
}

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

const CenterText = styled.Text`
  text-align: center;
  color: ${({ color }) => color || '#616161'};
  font-weight: bold;
`
