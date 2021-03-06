import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableWithoutFeedback, Text } from 'react-native'
import styled from 'styled-components/native'

import { PulsingCircle, TabBarIcon } from '../components'
import { WeeklyProgress } from '../modules/advice/containers/WeeklyProgress'
import {
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  DARK_THEME_BACKGROUND_COLOR,
  SMALL_FONT,
} from '../constants'

export class _HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <View />,
    headerRight: (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('History')}>
        <View style={{ alignItems: 'center', padding: 15 }}>
          <Text style={{ color: '#fff' }}>血糖历史</Text>
        </View>
      </TouchableWithoutFeedback>
    ),
    title: '测血糖',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        source={
          focused
            ? require('../assets/images/icon-tabbar-BG-Active.png')
            : require('../assets/images/icon-tabbar-BG-Inactive.png')
        }
      />
    ),
  })

  onPressHistory = () => {
    this.props.navigation.navigate('History', { patientId: this.props.appData.patientId })
  }

  onPressManualRecord = () => {
    this.props.navigation.navigate('ManualRecord', { patientId: this.props.appData.patientId })
  }

  render() {
    return (
      <RootView>
        <DarkBackground>
          <Centered>
            <PulsingCircle navigation={this.props.navigation} />
          </Centered>
          <TouchableWithoutFeedback small onPress={this.onPressManualRecord}>
            <View style={{ padding: 10 }}>
              <Text
                style={{
                  fontSize: SMALL_FONT,
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                + 手动补录
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </DarkBackground>
        <WeeklyProgress onPress={this.onPressHistory} patientId={this.props.appData.patientId} />
      </RootView>
    )
  }
}
function mapStateToProps(state) {
  return {
    appData: state.appData,
  }
}

export const HomeScreen = connect(mapStateToProps)(_HomeScreen)

const RootView = styled.View`
  flex: 1;
  background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};
`

const DarkBackground = styled.View`
  flex: 1;
  background-color: ${DARK_THEME_BACKGROUND_COLOR};
  justify-content: center;
`
const Centered = styled.View`align-items: center;`
