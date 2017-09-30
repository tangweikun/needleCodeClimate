import React from 'react'
import styled from 'styled-components/native'
import { Image, View } from 'react-native'
import {
  LIGHT_GREEN,
  LIGHT_THEME_BACKGROUND_COLOR,
  LIGHT_THEME_MUTED_TEXT_COLOR,
  DARK_RED,
  SMALL_FONT,
  SMALL_FONT_LINE_HEIGHT,
  GIANT_FONT,
  DigestiveStateLabel,
  LIGHT_ORANGE,
  isSmallScreen,
} from '../../../constants'
import { NickButton, PlainCircle } from '../../../components'
import { goal } from '../utils/goal'

const BloodSugarLabel = {
  lower: {
    color: DARK_RED,
    text: '血糖过低',
    advice: '您本次血糖过低，建议立即口服15-20g葡萄糖，或者3-4块方糖或硬糖，15分钟后再次监测血糖。',
    avatar: require('../../../assets/images/icon-candy.png'),
  },
  upper: {
    color: LIGHT_ORANGE,
    text: '血糖过高',
    advice: '本次血糖偏高，可能与饮食/药物/运动有关，建议定时定量进餐、遵医嘱服药、适当运动，更多问题请点”问医生”咨询。',
  },
  normal: {
    color: LIGHT_GREEN,
    advice: '非常棒！您本次测量的血糖正常，请继续保持下去，祝您健康！',
    text: '血糖正常',
    avatar: require('../../../assets/images/icon-thumb.jpg'),
  },
}

function getBloodSugarLabel(result, digestiveState) {
  const goalUpperLimit = goal[digestiveState].upper
  const goalLowerLimit = goal[digestiveState].lower

  if (result < goalLowerLimit) return BloodSugarLabel.lower
  if (result > goalUpperLimit) return BloodSugarLabel.upper
  return BloodSugarLabel.normal
}

function getGoalText(digestiveState) {
  return `${DigestiveStateLabel[digestiveState]}控糖目标 ${goal[digestiveState].lower} ~ ${goal[
    digestiveState
  ].upper}`
}

export const MeasureSuccess = ({ measureResult, digestiveState, goAskTab }) => (
  <RootView measureResult={measureResult} digestiveState={digestiveState}>
    <WrapperView>
      <PlainCircle>
        <ResultView>
          <ResultText>{measureResult}</ResultText>
        </ResultView>
        <ResultView>
          <UnitText>mmol/L</UnitText>
        </ResultView>
        {!!getBloodSugarLabel(measureResult, digestiveState).text && (
          <EvaluationView>
            <EvaluationText measureResult={measureResult} digestiveState={digestiveState}>
              {getBloodSugarLabel(measureResult, digestiveState).text}
            </EvaluationText>
          </EvaluationView>
        )}
      </PlainCircle>
      <GoalView>
        <GoalText>{getGoalText(digestiveState)}</GoalText>
      </GoalView>
    </WrapperView>
    <WhiteView>
      <Margins>
        <Advice>{getBloodSugarLabel(measureResult, digestiveState).advice}</Advice>
      </Margins>
      {getBloodSugarLabel(measureResult, digestiveState).avatar && (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={getBloodSugarLabel(measureResult, digestiveState).avatar}
            style={{ width: isSmallScreen ? 120 : 140, height: isSmallScreen ? 120 : 140 }}
          />
        </View>
      )}
      <StickyBottom>
        <NickButton dark title="问医生" onPress={() => goAskTab()} withoutMargin />
      </StickyBottom>
    </WhiteView>
  </RootView>
)

const GoalView = styled.View`padding-top: 30;`
const Advice = styled.Text`
  font-size: ${SMALL_FONT};
  line-height: ${SMALL_FONT_LINE_HEIGHT};
`
const StickyBottom = styled.View`
  justify-content: flex-end;
  margin-bottom: 15;
`
const Margins = styled.View``
const RootView = styled.View`
  flex: 1;
  background-color: ${p => getBloodSugarLabel(p.measureResult, p.digestiveState).color};
  justify-content: center;
`
const WrapperView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const WhiteView = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-top: 10;
  padding-left: 30;
  padding-right: 30;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`
const ResultView = styled.View``

const ResultText = styled.Text`
  font-size: ${GIANT_FONT};
  font-weight: bold;
`
const UnitText = styled.Text`color: ${LIGHT_THEME_MUTED_TEXT_COLOR};`

const GoalText = styled.Text`
  color: white;
  font-size: ${SMALL_FONT};
`

const EvaluationView = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 15;
`
const EvaluationText = styled.Text`
  color: ${p => getBloodSugarLabel(p.measureResult, p.digestiveState).color};
  font-weight: bold;
  font-size: ${SMALL_FONT};
`
