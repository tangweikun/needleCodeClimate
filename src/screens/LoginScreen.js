import React, { Component } from 'react'
import styled from 'styled-components/native'
import * as wechat from 'react-native-wechat'
import { withApollo } from 'react-apollo'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

import { NickButton } from '../components'
import { DARK_THEME_BUTTON_TEXT_COLOR, REGULAR_FONT } from '../constants'
import { wechatLoginMutation } from '../graphql'
import { setPatient } from '../ducks/actions'

@withApollo
class _LoginScreen extends Component {
  state = { isWXAppInstalled: false }

  componentWillMount() {
    wechat.isWXAppInstalled().then(installed => this.setState({ isWXAppInstalled: installed }))
  }

  onWechatLoginPress = async () => {
    const scope = 'snsapi_userinfo'
    const state = 'wechat_sdk_demo'
    try {
      const wxResp = await wechat.sendAuthRequest(scope, state)

      if (wxResp.errCode !== 0) return

      const response = await this.props.client.mutate({
        mutation: wechatLoginMutation,
        variables: { wechatCode: wxResp.code },
      })

      const {
        wechatOpenId,
        patientId,
        nickname,
        avatar,
        patientState,
        didCreateNewPatient,
      } = response.data.wechatLoginOrSignUp

      if (didCreateNewPatient) {
        this.props.navigation.navigate('VerifyMobile', { wechatOpenId })
      } else {
        await AsyncStorage.setItem(
          'userInfo',
          JSON.stringify({ patientId, nickname, avatar, patientState }),
        )
        this.props.navigation.navigate('First')
        this.props.setPatient({ patientId, nickname, avatar, patientState })
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <RootView>
        <MainView>
          <LogoView>
            <Logo source={require('../assets/images/splash-icon.png')} resizeMode="contain" />
            <LogoText>护血糖</LogoText>
          </LogoView>
          <LoginView>
            {this.state.isWXAppInstalled && (
              <NickButton
                dark
                title="微信登录"
                onPress={() => {
                  this.onWechatLoginPress()
                }}
              />
            )}
            <NickButton
              title="手机号登录"
              onPress={() => this.props.navigation.navigate('VerifyMobile')}
            />
          </LoginView>
        </MainView>
      </RootView>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({ setPatient: g => dispatch(setPatient(g)) })

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(_LoginScreen)

const RootView = styled.View`flex: 1;`
const MainView = styled.View`
  flex: 9;
  flex-direction: column;
`

const Logo = styled.Image`
  width: 70;
  height: 70;
  margin-bottom: 7;
`
const LogoView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const LoginView = styled.View`flex: 2;`

const LogoText = styled.Text`
  font-size: ${REGULAR_FONT};
  text-align: center;
  color: ${DARK_THEME_BUTTON_TEXT_COLOR};
`
