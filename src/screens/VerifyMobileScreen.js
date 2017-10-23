import * as React from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native'
import styled from 'styled-components/native'
import { withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { Observable } from 'rxjs'
import { get } from 'lodash'
import { logInOrSignUpMutation, sendVerificationCodeMutation } from '../graphql'
import { PRIMARY_COLOR, SMALL_FONT } from '../constants'
import { NickButton } from '../components'
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
      const { avatar, nickname, patientId, patientState } = response.data.loginOrSignUp

      await AsyncStorage.setItem(
        'userInfo',
        JSON.stringify({ patientId, nickname, avatar, patientState }),
      )
      this.props.navigation.navigate('First')
      this.props.setPatient({ patientId, nickname, avatar, patientState })
      this.setState({ loading: false })
    } catch (e) {
      Alert.alert('提示', '请输入正确的手机号和验证码')
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <RootView>
        <Green>
          <TextInput
            style={{
              height: 40,
              borderBottomWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.75)',
              marginBottom: 20,
              color: 'white',
            }}
            placeholder="手机号"
            placeholderTextColor="rgba(255, 255, 255, 0.75)"
            underlineColorAndroid="transparent"
            selectionColor="white"
            keyboardType="numeric"
            value={this.state.mobile}
            onChangeText={mobile => mobile.length < 12 && this.setState({ mobile })}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.75)',
              marginBottom: 40,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                height: 40,
                color: 'white',
              }}
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
          </View>
        </Green>
        <View style={{ paddingTop: 25 }}>
          {this.state.loading ? (
            <View>
              <ActivityIndicator animating size="large" color={PRIMARY_COLOR} />
            </View>
          ) : (
            <NickButton dark onPress={this.loginPress}>
              登录
            </NickButton>
          )}
        </View>
      </RootView>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({ setPatient: g => dispatch(setPatient(g)) })

export const VerifyMobileScreen = connect(mapStateToProps, mapDispatchToProps)(_VerifyMobileScreen)

const RootView = styled.View`flex: 1;`
const Green = styled.View`
  background-color: ${PRIMARY_COLOR};
  padding-left: 50;
  padding-right: 50;
`
const TextButton = styled.Text`
  color: ${p => (p.muted ? 'rgba(255,255,255,.6)' : 'white')};
  font-size: ${SMALL_FONT};
`
