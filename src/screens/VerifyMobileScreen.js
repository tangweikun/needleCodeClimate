import * as React from 'react'
import { TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Keyboard } from 'react-native'
import styled from 'styled-components/native'
import { withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { Observable } from 'rxjs'
import { get } from 'lodash'
import { NavigationActions } from 'react-navigation'

import { logInOrSignUpMutation, sendVerificationCodeMutation } from '../graphql'
import { PRIMARY_COLOR, SMALL_FONT } from '../constants'
import { Button } from '../components'
import { setPatient } from '../ducks/actions'

const cooldown = 60
@withApollo
class _VerifyMobileScreen extends React.Component {
  static navigationOptions = () => ({
    title: '登录',
  })

  state = {
    mobile: '',
    verificationCode: '',
    delayUntilNextSend: 0,
    loading: false,
  }

  onSendVerificationCodePress = () => {
    this.props.client
      .mutate({
        mutation: sendVerificationCodeMutation,
        variables: { mobile: this.state.mobile },
      })
      .catch(() => null)

    this.setState({ delayUntilNextSend: cooldown })
    this.verificationCodeInput.focus()
    Observable.interval(1000)
      .take(cooldown)
      .subscribe(x => this.setState({ delayUntilNextSend: cooldown - x - 1 }))
  }

  loginPress = async () => {
    this.setState({ loading: true })
    Keyboard.dismiss()
    try {
      const variables = {
        mobile: this.state.mobile,
        verificationCode: this.state.verificationCode,
        wechatOpenId: get(this.props.navigation, 'state.params.wechatOpenId', ''),
      }

      const response = await this.props.client.mutate({
        mutation: logInOrSignUpMutation,
        variables,
      })
      const userInfo = response.data.loginOrSignUp
      const { birthday, gender, height, weight, didCreateNewPatient } = userInfo
      if (didCreateNewPatient || !height || !weight || !gender || !birthday) {
        this.setState({ loading: false })
        this.props.navigation.navigate('NewPatient', { userInfo })
      } else {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'First' })],
        })

        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.props.navigation.dispatch(resetAction)
        this.props.setPatient(userInfo)
      }
      this.setState({ loading: false })
    } catch (e) {
      Alert.alert('提示', '请输入正确的手机号和验证码')
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <RootView>
        <TopView>
          <MobileInput
            placeholder="手机号"
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            underlineColorAndroid="transparent"
            selectionColor="white"
            keyboardType="numeric"
            autoFocus
            maxLength={11}
            value={this.state.mobile}
            onChangeText={mobile => mobile.length < 12 && this.setState({ mobile })}
          />

          <VerificationCodeView>
            <VerificationCodeInput
              ref={view => (this.verificationCodeInput = view)}
              placeholder="输入验证码"
              placeholderTextColor="rgba(255, 255, 255, 0.75)"
              selectionColor="white"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              value={this.state.verificationCode}
              onChangeText={verificationCode => this.setState({ verificationCode })}
            />
            <TouchableOpacity
              onPress={this.onSendVerificationCodePress}
              disabled={!!this.state.delayUntilNextSend || this.state.mobile.length < 11}
            >
              <TextButton muted={!!this.state.delayUntilNextSend || this.state.mobile.length < 11}>
                {this.state.delayUntilNextSend ? `${this.state.delayUntilNextSend}秒` : '获取验证码'}
              </TextButton>
            </TouchableOpacity>
          </VerificationCodeView>
        </TopView>

        <BottomView>
          {this.state.loading ? (
            <ActivityIndicator animating size="large" color={PRIMARY_COLOR} />
          ) : (
            <Button dark onPress={this.loginPress} title="登录" />
          )}
        </BottomView>
      </RootView>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({ setPatient: g => dispatch(setPatient(g)) })

export const VerifyMobileScreen = connect(mapStateToProps, mapDispatchToProps)(_VerifyMobileScreen)

const RootView = styled.View`flex: 1;`

const TopView = styled.View`
  background-color: ${PRIMARY_COLOR};
  padding-left: 50;
  padding-right: 50;
`
const TextButton = styled.Text`
  color: ${p => (p.muted ? 'rgba(255,255,255,.6)' : 'white')};
  font-size: ${SMALL_FONT};
`

const VerificationCodeInput = styled.TextInput`
  flex: 1;
  height: 40;
  color: white;
`
const MobileInput = styled.TextInput`
  height: 40;
  border-bottom-width: 1;
  border-color: rgba(255, 255, 255, 0.75);
  margin-bottom: 20;
  color: white;
`

const VerificationCodeView = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1;
  border-color: rgba(255, 255, 255, 0.75);
  margin-bottom: 40;
`

const BottomView = styled.View`padding-top: 25;`
