import React from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

import { LIGHT_THEME_BACKGROUND_COLOR, LIGHT_THEME_ALT_TEXT_COLOR, SMALL_FONT } from '../constants'

export class PulsingCircle extends React.Component {
  state = {
    buttonPulse: new Animated.Value(0),
    pulseDuration: 2000,
    pulseSize: 1.1,
  }
  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.buttonPulse, {
          toValue: 1,
          duration: this.state.pulseDuration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.buttonPulse, {
          toValue: 0,
          duration: this.state.pulseDuration / 2,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }
  onPressMeasure = () => {
    this.props.navigation.navigate('Measure')
  }
  render() {
    const buttonScale = this.state.buttonPulse.interpolate({
      inputRange: [0, 1],
      outputRange: [1, this.state.pulseSize],
    })
    return (
      <RootView>
        <CircleTouch onPress={this.onPressMeasure}>
          <CircleWrapper>
            <Animated.View
              style={{
                width: 160,
                height: 160,
                transform: [{ scale: buttonScale }],
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <OuterCircle />
              <InnerCircle />
            </Animated.View>
            <CircleView>
              <Logo source={require('../assets/images/icon-inverted.png')} resizeMode="contain" />
              <AnyText>开始测量</AnyText>
            </CircleView>
          </CircleWrapper>
        </CircleTouch>
      </RootView>
    )
  }
}
const RootView = styled.View``
const Logo = styled.Image`
  height: 50;
  margin-bottom: 15px;
`
const CircleWrapper = styled.View`
  width: 200;
  height: 200;
  align-items: center;
  justify-content: center;
`
const CircleTouch = styled.TouchableWithoutFeedback`border-radius: 75;`
const OuterCircle = styled.View`
  background-color: rgba(255, 255, 255, 0.2);
  width: 160;
  height: 160;
  border-radius: 100;
  position: absolute;
`
const InnerCircle = styled.View`
  background-color: rgba(255, 255, 255, 0.4);
  width: 150;
  height: 150;
  border-radius: 75;
  position: absolute;
`
const CircleView = styled.View`
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
  width: 150;
  height: 150;
  border-radius: 75;
  align-items: center;
  justify-content: center;
  position: absolute;
`
const AnyText = styled.Text`
  font-size: ${SMALL_FONT};
  color: ${LIGHT_THEME_ALT_TEXT_COLOR};
`
