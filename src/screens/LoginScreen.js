import React, { Component } from 'react'
import styled from 'styled-components/native'
import * as wechat from 'react-native-wechat'
import { withApollo } from 'react-apollo'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

import { Button } from '../components'
import { GRAY136, REGULAR_FONT, LARGE_FONT, DARK_BLACK } from '../constants'
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
        birthday,
        gender,
        height,
        weight,
        diabetesType,
        startOfIllness,
        targetWeight,
        mobile,
      } = response.data.wechatLoginOrSignUp

      if (didCreateNewPatient) {
        this.props.navigation.navigate('VerifyMobile', { wechatOpenId })
      } else {
        await AsyncStorage.setItem(
          'userInfo',
          JSON.stringify({
            patientId,
            nickname,
            avatar,
            patientState,
            birthday,
            gender,
            height,
            weight,
            diabetesType,
            startOfIllness,
            targetWeight,
            mobile,
          }),
        )
        this.props.navigation.navigate('First')
        this.props.setPatient({
          patientId,
          nickname,
          avatar,
          patientState,
          birthday,
          gender,
          height,
          weight,
          diabetesType,
          startOfIllness,
          targetWeight,
          mobile,
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <RootView>
        <LogoView>
          <Logo source={require('../assets/images/icon_login_app.png')} resizeMode="contain" />
          <LargeText>护血糖</LargeText>
          <SmallText>管理血糖更简单</SmallText>
        </LogoView>
        {this.state.isWXAppInstalled && (
          <Button
            dark
            title="微信登录"
            icon={require('../assets/images/icon_login_wechat.png')}
            onPress={() => this.onWechatLoginPress()}
          />
        )}
        <Button
          title="手机号登录"
          icon={require('../assets/images/icon_login_phone.png')}
          onPress={() => this.props.navigation.navigate('VerifyMobile')}
        />
      </RootView>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({ setPatient: g => dispatch(setPatient(g)) })

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(_LoginScreen)

const RootView = styled.View``

const SmallText = styled.Text`
  font-size: ${REGULAR_FONT};
  text-align: center;
  color: ${GRAY136};
`

const LargeText = styled.Text`
  font-size: ${LARGE_FONT};
  text-align: center;
  color: ${DARK_BLACK};
`

const Logo = styled.Image`
  width: 70;
  height: 70;
  margin-bottom: 7px;
`
const LogoView = styled.View`
  margin-top: 120px;
  margin-bottom: 56px;
  align-items: center;
`
