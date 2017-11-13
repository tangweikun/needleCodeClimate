import React from 'react'
import styled from 'styled-components/native'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { LIGHT_GREEN, LIGHT_THEME_ALT_BACKGROUND_COLOR } from '../../constants'
import { Button } from '../../components'
import { MacroNutrientGoal } from './components'

class _DietHomePage extends React.Component {
  render() {
    const { weight, height } = this.props.appData

    return (
      <RootView>
        <MacroNutrientGoal
          height={height}
          weight={weight}
          onPress={() => Alert.alert('代币说明', '一种食物货币，会根据您的身高体重计算出每日推荐量。')}
        />
        <AddMeal>
          <Button
            title="记录饮食"
            dark
            color={LIGHT_GREEN}
            onPress={() => this.props.navigation.navigate('SelectDigestiveState')}
          />
        </AddMeal>
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
const AddMeal = styled.View`margin-top: 60;`
