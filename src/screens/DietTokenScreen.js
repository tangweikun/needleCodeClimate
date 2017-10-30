import React from 'react'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
import {
  ScreenWidth,
  DIET_TOKEN_ORANGE,
  LARGE_FONT,
  GIANT_FONT,
  REGULAR_FONT,
  SMALL_FONT,
  GRAY136,
  PAGE_MARGIN,
  LIGHT_GREEN,
  LIGHT_THEME_BACKGROUND_COLOR,
} from '../constants'
import { Button } from '../components'

export class DietTokenScreen extends React.Component {
  static navigationOptions = () => ({
    title: '饮食代币',
    headerStyle: {
      justifyContent: 'center',
      borderBottomWidth: 0,
      backgroundColor: DIET_TOKEN_ORANGE,
    },
  })

  render() {
    return (
      <RootView>
        <ImageContainer
          source={require('../assets/images/icon-background-token.png')}
          style={{ width: ScreenWidth, height: ScreenWidth / 3 }}
        />

        <TopView>
          <LargeText>今日代币 </LargeText>
          <GiantText>12</GiantText>
        </TopView>

        <CenterView>
          <RegularText>一日能量需求：1520 kcal</RegularText>
        </CenterView>

        <BottomView>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <VerticalLine />
            <Text style={{ fontSize: REGULAR_FONT }}>代币说明：</Text>
          </View>
          <View style={{ marginTop: 16, alignItems: 'flex-start' }}>
            <SmallText>代币：一种食物货币，用于计算每日饮食。</SmallText>
            <SmallText>今日代币：根据您的一日能量需求（包括碳水化合物、蛋白质、脂肪）换算成的代币数量，代表了今天可用的饮食代币数。</SmallText>
            <SmallText>一日能量需求：根据您的身高体重自动计算出。</SmallText>
          </View>
        </BottomView>

        <View style={{ marginTop: 'auto', marginBottom: 20 }}>
          <Button title="饮食打卡" dark color={LIGHT_GREEN} />
        </View>
      </RootView>
    )
  }
}

const VerticalLine = styled.View`
  background-color: ${DIET_TOKEN_ORANGE};
  width: 2;
  height: 18;
  margin-right: 16px;
`

const RootView = styled.View`
  flex: 1;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`

const TopView = styled.View`
  margin-top: 20;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const CenterView = styled.View`
  margin-top: 20;
  align-items: center;
`

const BottomView = styled.View`
  padding-left: ${PAGE_MARGIN};
  padding-right: ${PAGE_MARGIN};
  margin-top: 40;
`
const ImageContainer = styled.Image``

const SmallText = styled.Text`
  font-size: ${SMALL_FONT};
  color: ${GRAY136};
`

const RegularText = styled.Text`
  font-size: ${REGULAR_FONT};
  color: ${GRAY136};
`

const LargeText = styled.Text`
  font-size: ${LARGE_FONT};
  color: ${DIET_TOKEN_ORANGE};
`

const GiantText = styled.Text`
  font-size: ${GIANT_FONT};
  color: ${DIET_TOKEN_ORANGE};
  font-weight: bold;
`
