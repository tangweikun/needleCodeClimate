import React from 'react'
import styled from 'styled-components/native'
import { View, Alert } from 'react-native'
import { connect } from 'react-redux'
import {
  DIET_TOKEN_ORANGE,
  LIGHT_GREEN,
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  RGB215,
  RGB252,
} from '../../constants'
import { Button } from '../../components'
import {
  getDailyDietToken,
  LUNCH_PROPORTION,
  CARBOHYDRATE_PROPORTION,
  FAT_PROPORTION,
  CARBOHYDRATE_EXCHANGE_RATE,
  FAT_EXCHANGE_RATE,
} from './utils'
import { DietTokenCard } from './components'

class _DietHomePage extends React.Component {
  getDietTokenData = ({ weight, height }) => [
    {
      value:
        getDailyDietToken({
          weight,
          height,
          proportion: CARBOHYDRATE_PROPORTION,
          exchangeRate: CARBOHYDRATE_EXCHANGE_RATE,
        }) * LUNCH_PROPORTION,
      name: '碳水',
      icon: require('../../assets/images/icon_carbohydrate.png'),
      color: RGB215,
    },
    {
      value:
        getDailyDietToken({
          weight,
          height,
          proportion: CARBOHYDRATE_PROPORTION,
          exchangeRate: CARBOHYDRATE_EXCHANGE_RATE,
        }) * LUNCH_PROPORTION,
      name: '蛋白质',
      icon: require('../../assets/images/icon_protein.png'),
      color: RGB252,
    },
    {
      value:
        getDailyDietToken({
          weight,
          height,
          proportion: FAT_PROPORTION,
          exchangeRate: FAT_EXCHANGE_RATE,
        }) * LUNCH_PROPORTION,
      name: '油脂',
      icon: require('../../assets/images/icon_fat.png'),
      color: DIET_TOKEN_ORANGE,
    },
  ]

  render() {
    const { weight, height } = this.props.appData

    return (
      <RootView>
        <DietTokenCard
          dietTokenData={this.getDietTokenData({ weight, height })}
          onPress={() => Alert.alert('代币说明', '一种食物货币，会根据您的身高体重计算出每日推荐量。')}
        />
        <View style={{ marginTop: 60 }}>
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

const RootView = styled.View`
  flex: 1;
  background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};
`
