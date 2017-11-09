import React from 'react'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import {
  DIET_TOKEN_ORANGE,
  LARGE_FONT,
  RGB102,
  PAGE_MARGIN,
  LIGHT_GREEN,
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  LIGHT_THEME_BACKGROUND_COLOR,
  SMALL_FONT,
  RGB215,
  RGB252,
  REGULAR_FONT,
} from '../../constants'
import { Button } from '../../components'

class _DietHomePage extends React.Component {
  getDailyEnergyNeeds = ({ weight, height }) =>
    this.getIdealWeight({ height }) * this.getEnergyCoefficient({ height, weight })

  getIdealWeight = ({ height }) => (height ? Math.pow(height / 100, 2) * 22 : 65)

  getEnergyCoefficient = ({ height, weight }) => {
    const BMI = this.getBMI({ height, weight })
    if (BMI >= 18.5 && BMI <= 23.9) return 27
    if (BMI > 0 && BMI < 18.5) return 30
    if (BMI >= 24) return 25

    return 27
  }

  getBMI = ({ weight, height }) =>
    (weight && height ? (weight / Math.pow(height / 100, 2)).toFixed(1) : 24)

  getCarbohydrateOfLunch = ({ weight, height }) => {
    if (!height || !weight) return 24
    return Math.round(this.getDailyEnergyNeeds({ weight, height }) * 0.5 * 0.4 / 80)
  }

  getProteinOfLunch = ({ weight, height }) => {
    if (!height || !weight) return 24
    return Math.round(this.getDailyEnergyNeeds({ weight, height }) * 0.2 * 0.4 / 40)
  }

  getFatOfLunch = ({ weight, height }) => {
    if (!height || !weight) return 24
    return Math.round(this.getDailyEnergyNeeds({ weight, height }) * 0.3 * 0.4 / 63)
  }

  render() {
    const { weight, height } = this.props.appData
    return (
      <RootView>
        <TopView>
          <View>
            <SmallText>今日午餐代币</SmallText>
          </View>

          <DetailView>
            <HorizontalView>
              <LargeText color={RGB215}>
                {this.getCarbohydrateOfLunch({ weight, height })}
              </LargeText>
              <ImageView
                source={require('../../assets/images/icon_carbohydrate.png')}
                resizeMode="contain"
              />
              <SmallText>碳水</SmallText>
            </HorizontalView>
            <HorizontalView>
              <LargeText color={RGB252}>{this.getProteinOfLunch({ weight, height })}</LargeText>
              <ImageView
                source={require('../../assets/images/icon_protein.png')}
                resizeMode="contain"
              />
              <SmallText>蛋白质</SmallText>
            </HorizontalView>
            <HorizontalView>
              <LargeText color={DIET_TOKEN_ORANGE}>
                {this.getFatOfLunch({ weight, height })}
              </LargeText>
              <ImageView
                source={require('../../assets/images/icon_fat.png')}
                resizeMode="contain"
              />
              <SmallText>油脂</SmallText>
            </HorizontalView>
          </DetailView>
        </TopView>

        <BottomView>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <VerticalLine />
            <Text style={{ fontSize: REGULAR_FONT }}>代币说明：</Text>
          </View>
          <View style={{ marginTop: 16, alignItems: 'flex-start' }}>
            <SmallText textAlign="left">代币：一种食物货币，用于计算每日饮食。</SmallText>
            <SmallText textAlign="left">
              今日代币：根据您的一日能量需求（包括碳水化合物、蛋白质、油脂）换算成的代币数量，代表了今天可用的饮食代币数。
            </SmallText>
            <SmallText textAlign="left">一日能量需求：根据您的身高体重自动计算出。</SmallText>
          </View>
        </BottomView>

        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Button
            title="记录饮食"
            dark
            color={LIGHT_GREEN}
            onPress={() => this.props.navigation.navigate('SelectDigestiveState')}
          />
        </View>
      </RootView>
    )
  }
}

const mapStateToProps = state => ({ appData: state.appData })

const mapDispatchToProps = () => ({})

export const DietHomePage = connect(mapStateToProps, mapDispatchToProps)(_DietHomePage)

const BottomView = styled.View`
  padding-left: ${PAGE_MARGIN};
  padding-right: ${PAGE_MARGIN};
  margin-top: 40;
`

const VerticalLine = styled.View`
  background-color: ${DIET_TOKEN_ORANGE};
  width: 2;
  height: 18;
  margin-right: 16px;
`

const DetailView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const RootView = styled.ScrollView`
  flex: 1;
  background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};
`

const TopView = styled.View`
  padding-top: 12;
  padding-bottom: 12;
  margin-top: 30;
  height: 210;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
  margin-left: ${PAGE_MARGIN};
  margin-right: ${PAGE_MARGIN};
`

const LargeText = styled.Text`
  text-align: center;
  font-size: ${LARGE_FONT};
  font-weight: bold;
  color: ${p => p.color};
`

const SmallText = styled.Text`
  font-size: ${SMALL_FONT};
  color: ${RGB102};
  text-align: ${p => p.textAlign || 'center'};
`

const ImageView = styled.Image`width: 40;`

const HorizontalView = styled.View`
  align-items: center;
  width: 60;
`
