import * as React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  AsyncStorage,
  Alert,
} from 'react-native'
import styled from 'styled-components/native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { gql, graphql, withApollo } from 'react-apollo'
import { NavigationActions } from 'react-navigation'
import { PRIMARY_COLOR } from '../constants'
import { NickButton } from '../components'
@withApollo
export class VerifyMobileScreen extends React.Component {
  state = {
    mobile: '',
    verificationCode: '',
  }
  onSendVerificationCodePress = () => {
    console.log('send')
  }
  render() {
    return (
      <Root>
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
            onChangeText={mobile => this.setState({ mobile })}
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
            <TouchableOpacity onPress={this.onSendVerificationCodePress}>
              <Text style={{ color: 'white', fontSize: 17 }}>获取验证码</Text>
            </TouchableOpacity>
          </View>
        </Green>
        <White>
          <NickButton dark>登录</NickButton>
        </White>
      </Root>
    )
  }
}
const Root = styled.View`flex: 1;`
const Green = styled.View`
  flex: 1;
  background-color: ${PRIMARY_COLOR};
  padding: 50px;
`
const White = styled.View`
  flex: 4;
  padding-top: 30px;
`
