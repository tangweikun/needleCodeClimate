import React from 'react'
import styled from 'styled-components/native'

import { StepIndicator, TutorialImage } from '../../../components'
import { DigestiveStateButtons } from '../containers/DigestiveStateButtons'
import {
  LIGHT_THEME_BACKGROUND_COLOR,
  DARK_THEME_BACKGROUND_COLOR,
  DARK_THEME_TEXT_COLOR,
  REGULAR_FONT,
} from '../../../constants'
import {
  ACTION_BG1_SENDCODE_RESULT,
  ACTION_BG1_MEASURE_STRIP_IN,
  ACTION_BG1_MEASURE_STRIP_OUT,
  Event_Scan_Device,
  Event_Device_Connected,
} from '../utils/SDK'

// const getLabels = ({ currentPosition, digestiveState }) => [
//   currentPosition > 0 ? DigestiveStateLabel[digestiveState] : '选择时间段',
//   currentPosition > 1 ? '连接成功' : '连接血糖仪',
//   currentPosition > 2 ? '已插入试纸' : '插入试纸',
//   '测量血糖',
// ]

const GUIDANCES = [
  { firstLine: '请选择本次测量的时间段' },
  { firstLine: '请把血糖仪插入手机耳机孔', secondLine: '注意：有英文字的面朝上' },
  { firstLine: '请把试纸插入血糖仪', secondLine: '注意：试纸红色箭头朝上' },
  { firstLine: '用采血笔采血后，把试纸底端', secondLine: '垂直朝向手指采血处吸血' },
  {},
]
const stepLogic = (digestiveState, latestEvent) => {
  let currentPosition = 0
  if (digestiveState) {
    currentPosition = 1
    if (
      latestEvent === ACTION_BG1_SENDCODE_RESULT ||
      latestEvent === ACTION_BG1_MEASURE_STRIP_OUT
    ) {
      currentPosition = 2
    }
    if (latestEvent === ACTION_BG1_MEASURE_STRIP_IN) currentPosition = 3
  }

  return currentPosition
}

export const MeasureDefault = ({ digestiveState, latestEvent }) => {
  const currentPosition = stepLogic(digestiveState, latestEvent)

  return (
    <RootView>
      <TopView>
        {digestiveState ? <TutorialImage latestEvent={latestEvent} /> : <DigestiveStateButtons />}
      </TopView>
      <BottomView>
        <StepsView>
          <StepIndicator
            customStyles={firstIndicatorStyles}
            currentPosition={currentPosition}
            stepCount={4}
          />
        </StepsView>
        {latestEvent === Event_Scan_Device || latestEvent === Event_Device_Connected ? (
          <AdviceView>
            <AdviceText>血糖仪连接中...</AdviceText>
          </AdviceView>
        ) : (
          <AdviceView>
            <AdviceText>{GUIDANCES[currentPosition].firstLine}</AdviceText>
            <AdviceText>{GUIDANCES[currentPosition].secondLine}</AdviceText>
          </AdviceView>
        )}
      </BottomView>
    </RootView>
  )
}
const RootView = styled.View`
  flex: 1;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`
const TopView = styled.View`
  flex: 4;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`

const AdviceText = styled.Text`
  text-align: center;
  color: ${DARK_THEME_TEXT_COLOR};
  font-size: ${REGULAR_FONT};
`

const BottomView = styled.View`
  flex: 3;
  background-color: ${DARK_THEME_BACKGROUND_COLOR};
`
const StepsView = styled.View`
  flex: 2;
  justify-content: center;
`
const AdviceView = styled.View`
  flex: 3;
  justify-content: center;
  background-color: ${DARK_THEME_BACKGROUND_COLOR};
`

// const firstIndicatorStyles = {
//   stepIndicatorSize: 20,
//   currentStepIndicatorSize: 20,
//   separatorStrokeWidth: 2,
//   currentStepStrokeWidth: 2,
//   stepStrokeCurrentColor: '#7eaec4',
//   stepStrokeWidth: 2,
//   stepStrokeFinishedColor: DARK_THEME_TEXT_COLOR,
//   stepStrokeUnFinishedColor: '#7eaec4',
//   separatorFinishedColor: 'transparent',
//   separatorUnFinishedColor: 'transparent',
//   stepIndicatorFinishedColor: DARK_THEME_TEXT_COLOR,
//   stepIndicatorUnFinishedColor: 'transparent',
//   stepIndicatorCurrentColor: 'transparent',
//   stepIndicatorLabelFontSize: 0,
//   currentStepIndicatorLabelFontSize: 0,
//   stepIndicatorLabelCurrentColor: '#7eaec4',
//   stepIndicatorLabelFinishedColor: '#7eaec4',
//   stepIndicatorLabelUnFinishedColor: '#7eaec4',
//   labelColor: DARK_THEME_TEXT_COLOR,
//   labelSize: SMALL_FONT,
//   currentStepLabelColor: DARK_THEME_TEXT_COLOR,
// }

const firstIndicatorStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#fff',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: DARK_THEME_TEXT_COLOR,
  stepStrokeUnFinishedColor: '#fff',
  separatorFinishedColor: '#fff',
  separatorUnFinishedColor: '#fff',
  stepIndicatorFinishedColor: '#fff',
  stepIndicatorUnFinishedColor: DARK_THEME_BACKGROUND_COLOR,
  stepIndicatorCurrentColor: DARK_THEME_BACKGROUND_COLOR,
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 12,
  stepIndicatorLabelCurrentColor: '#fff',
  stepIndicatorLabelFinishedColor: DARK_THEME_BACKGROUND_COLOR,
  stepIndicatorLabelUnFinishedColor: '#fff',
  labelColor: '#fff',
  labelSize: 12,
  currentStepLabelColor: '#fff',
}
