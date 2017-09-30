import React from 'react'
import { AsyncStorage, Image, View, Text } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { toggleDevMode, setPatient } from '../ducks/actions'
import { FlatListWithIcons } from '../modules/preferences/FlatListWithIcons'

import { PRIMARY_COLOR, defaultAvatar } from '../constants'

export class _PreferencesScreen extends React.Component {
  static navigationOptions = () => ({
    title: '个人中心',
    headerLeft: null,
    tabBarIcon: ({ focused }) =>
      (focused ? (
        <Image
          style={{ height: 20, width: 20 }}
          source={require('../assets/images/tab-icon-profile-1.png')}
        />
      ) : (
        <Image
          style={{ height: 20, width: 20 }}
          source={require('../assets/images/tab-icon-profile-2.png')}
        />
      )),
  })
  logout = () => {
    this.props.setPatient({})
    AsyncStorage.removeItem('userInfo')
  }
  aboutUs = () => {
    this.props.navigation.navigate('AboutUs')
  }
  introduction = () => {
    this.props.navigation.navigate('Introduction')
  }
  agreement = () => {
    this.props.navigation.navigate('Agreement')
  }

  render() {
    return (
      <RootView>
        <View style={{ alignItems: 'center', backgroundColor: PRIMARY_COLOR, padding: 15 }}>
          <Image
            style={{ height: 64, width: 64, marginBottom: 5, borderRadius: 32 }}
            source={{
              uri: this.props.appData.avatar || defaultAvatar,
            }}
          />
          <Text style={{ color: '#fff' }}>{this.props.appData.nickname}</Text>
        </View>
        <FlatListWithIcons
          onAboutUsPress={this.aboutUs}
          onSignOutPress={this.logout}
          onIntroductionPress={this.introduction}
          onAgreementPress={this.agreement}
        />
      </RootView>
    )
  }
}
function mapStateToProps(state) {
  return {
    appData: state.appData,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    toggleDevMode: () => dispatch(toggleDevMode()),
    setPatient: g => dispatch(setPatient(g)),
  }
}

export const PreferencesScreen = connect(mapStateToProps, mapDispatchToProps)(_PreferencesScreen)
const RootView = styled.View`flex: 1;`
