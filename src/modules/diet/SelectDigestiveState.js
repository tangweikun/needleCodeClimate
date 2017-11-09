import React from 'react'
import styled from 'styled-components/native'
import {
  LARGE_FONT,
  PAGE_MARGIN,
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  LIGHT_THEME_BACKGROUND_COLOR,
} from '../../constants'

export class SelectDigestiveState extends React.Component {
  render() {
    return (
      <RootView>
        <TouchButton
          onPress={() => this.props.navigation.navigate('SelectFood', { mealTime: 'BREAKFAST' })}
        >
          <TopView>
            <LargeText>早餐</LargeText>
          </TopView>
        </TouchButton>

        <TouchButton
          onPress={() => this.props.navigation.navigate('SelectFood', { mealTime: 'LUNCH' })}
        >
          <TopView>
            <LargeText>午餐</LargeText>
          </TopView>
        </TouchButton>
        <TouchButton
          onPress={() => this.props.navigation.navigate('SelectFood', { mealTime: 'DINNER' })}
        >
          <TopView>
            <LargeText>晚餐</LargeText>
          </TopView>
        </TouchButton>
      </RootView>
    )
  }
}

const RootView = styled.View`
  flex: 1;
  background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};
`

const TopView = styled.View`
  margin-top: 20;
  height: 100;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
  margin-left: ${PAGE_MARGIN};
  margin-right: ${PAGE_MARGIN};
`

const LargeText = styled.Text`font-size: ${LARGE_FONT};`

const TouchButton = styled.TouchableWithoutFeedback``
