import React, { Component } from 'react'
import { AsyncStorage, Keyboard, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { NickButton, InternetError } from '../components'
import { setPatient } from '../ducks/actions'
import { patientQuery } from '../graphql'
import { DARK_THEME_BUTTON_TEXT_COLOR, REGULAR_FONT, SMALL_FONT } from '../constants'

const HiddenLoginButton = ({ data, handleSignIn }) => {
  if (data && data.error) {
    return (
      <RootView>
        <ErrorText>{JSON.stringify(data.error)}</ErrorText>
      </RootView>
    )
  }
  if (!data || !data.patient) {
    return (
      <RootView>
        <NickButton title="登录" onPress={() => console.log('nothing')} />
        {/* <NickButton
          title="dev登录"
          dark
          onPress={() =>
            handleSignIn({
              _id: 'f5af0a03b9dd397c9b2666f8',
              nickname: 'Nick',
              avatar: 'https://api.ihealthlabs.com.cn:8443/logos/201612/b2871ded.jpg',
            })}
        />
        <NickButton dark onPress={() => Alert.alert('未完成')}>
          <Icon name="wechat" size={REGULAR_FONT} /> 微信登录
        </NickButton> */}
      </RootView>
    )
  }
  if (data.loading) return <ActivityIndicator />
  if (data.error) return <InternetError error={JSON.stringify(data.error.message)} />
  return <NickButton title="登录" dark onPress={() => handleSignIn(data.patient)} />
}

export class _LoginScreen extends Component {
  state = {
    telephone: '',
  }

  handleSignIn = ({ _id, nickname, avatar }) => {
    AsyncStorage.setItem('userInfo', JSON.stringify({ patientId: _id, nickname, avatar }))
    this.props.setPatient({ patientId: _id, nickname, avatar })
    Keyboard.dismiss()
  }

  render() {
    const { telephone } = this.state
    const ViewWithData = graphql(patientQuery, {
      options: { variables: { telephone } },
    })(HiddenLoginButton)
    return (
      <RootView>
        <MainView>
          <LogoView>
            <Logo source={require('../assets/images/splash-icon.png')} resizeMode="contain" />
            <LogoText>护血糖</LogoText>
          </LogoView>
          <LoginView>
            <LoginInput
              onChangeText={value => {
                this.setState({ telephone: value })
              }}
              value={this.state.text}
              autoCorrect={false}
              maxLength={11}
              keyboardType={'phone-pad'}
              placeholder="手机号"
              underlineColorAndroid="transparent"
            />

            {this.state.telephone.length === 11 ? (
              <ViewWithData handleSignIn={this.handleSignIn} />
            ) : (
              <HiddenLoginButton handleSignIn={this.handleSignIn} />
            )}
          </LoginView>
        </MainView>
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
    setPatient: g => dispatch(setPatient(g)),
  }
}

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(_LoginScreen)

const RootView = styled.View`flex: 1;`
const MainView = styled.View`
  flex: 9;
  flex-direction: column;
`

const Logo = styled.Image`
  width: 70;
  height: 70;
`
const LogoView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const LoginView = styled.View`flex: 2;`
const ErrorText = styled.Text`
  font-size: ${SMALL_FONT};
  text-align: center;
  color: ${DARK_THEME_BUTTON_TEXT_COLOR};
`
const LogoText = styled.Text`
  font-size: ${REGULAR_FONT};
  text-align: center;
  color: ${DARK_THEME_BUTTON_TEXT_COLOR};
`
const LoginInput = styled.TextInput`
  font-size: ${REGULAR_FONT};
  margin-left: 50;
  margin-right: 50;
  border-bottom-width: 2;
  border-bottom-color: lightgray;
  margin-bottom: 20;
`
