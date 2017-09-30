import React from 'react'
import styled from 'styled-components/native'
import { Image, Animated, Easing } from 'react-native'
import { DARK_THEME_BACKGROUND_COLOR, DARK_THEME_TEXT_COLOR, REGULAR_FONT } from '../constants'

export class WaitingForResult extends React.Component {
  state = {
    initialHeight: 370,
    height: new Animated.Value(370),
  }
  componentDidMount() {
    Animated.timing(this.state.height, {
      toValue: 0,
      duration: 7000,
      easing: Easing.linear,
    }).start()
  }
  render() {
    return (
      <RootView>
        <StripView>
          <RedBar />
          <Animated.View
            style={{
              width: 60,
              height: this.state.height,
              position: 'absolute',
              backgroundColor: DARK_THEME_BACKGROUND_COLOR,
              overflow: 'hidden',
            }}
          />
          <RedBox height={this.state.initialHeight} />
          <Image
            source={require('../assets/images/test-strip.png')}
            style={{
              width: 180,
              height: this.state.initialHeight,
            }}
            resizeMode="contain"
          />
        </StripView>
        <TestingView>
          <Testing>测量中...</Testing>
        </TestingView>
      </RootView>
    )
  }
}

const RedBox = styled.View`
  background-color: red;
  position: absolute;
  top: ${p => p.height - 20};
  width: 20;
  height: 20;
`

const RedBar = styled.View`
  background-color: red;
  position: absolute;
  width: 55;
  height: 355;
`
const StripView = styled.View`
  top: 60;
  align-items: center;
`

const RootView = styled.View`
  flex: 1;
  background-color: ${DARK_THEME_BACKGROUND_COLOR};
`
const TestingView = styled.View`
  flex: 1;
  justify-content: center;
`
const Testing = styled.Text`
  color: ${DARK_THEME_TEXT_COLOR};
  font-size: ${REGULAR_FONT};
  text-align: center;
`
