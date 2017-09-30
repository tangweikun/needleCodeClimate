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
  Image,
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import styled from 'styled-components/native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { gql, graphql, withApollo } from 'react-apollo'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button'

import { NavigationActions } from 'react-navigation'
import { PRIMARY_COLOR, REGULAR_FONT, SMALL_FONT } from '../constants'
import { NickButton } from '../components'
@withApollo
export class NewPatientScreen extends React.Component {
  state = {
    name: '',
    birthDate: '',
    gender: '',
    radio_props: [{ label: '男', value: 'MALE' }, { label: '女', value: 'FEMALE' }],
  }
  render() {
    const now = new Date()
    const dateNow = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
    return (
      <Root>
        <Padded>
          <Description>请补充您的个人信息，登录后才能获得医生的诊疗服务。</Description>
          <Padded>
            <Avatar>
              <Image
                style={{ height: 60, width: 60 }}
                source={require('../assets/images/icon-doctor.png')}
              />
            </Avatar>
            <Root>
              <Underlined>
                <Text style={{ color: 'black', fontSize: SMALL_FONT }}>姓名</Text>
                <NameInput placeholder="输入真实姓名" />
              </Underlined>

              <Underlined>
                <Text style={{ color: 'black', fontSize: SMALL_FONT }}>出生日期</Text>
                <DatePicker
                  style={{ width: 160 }}
                  date={this.state.birthDate}
                  mode="date"
                  format="YYYY-MM-DD"
                  minDate="1900-01-01"
                  maxDate={dateNow}
                  confirmBtnText="确认"
                  cancelBtnText="取消"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                    },
                  }}
                  onDateChange={birthDate => {
                    this.setState({ birthDate })
                  }}
                />
              </Underlined>
              <Row>
                <RadioForm
                  radio_props={this.state.radio_props}
                  initial={-1}
                  buttonColor={PRIMARY_COLOR}
                  onPress={gender => {
                    this.setState({ gender })
                  }}
                />
              </Row>
            </Root>
          </Padded>
          <Root>
            <NickButton dark margin={false}>
              登录
            </NickButton>
          </Root>
        </Padded>
      </Root>
    )
  }
}
const Root = styled.View`flex: 1;`

const Padded = styled.View`
  flex: 2;
  padding: 40px;
`
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 40;
`
const Description = styled.Text`font-size: ${REGULAR_FONT};`
const NameInput = styled.TextInput`
  flex: 1;
  height: 40;
`
const Avatar = styled.View`
  flex: 1;
  max-height: 60;
  padding-bottom: 20;
  justify-content: center;
  align-items: center;
`
const Underlined = styled.View`
  flex-direction: row;
  align-items: center;
  border-color: black;
  border-bottom-width: 1;
  margin-bottom: 20;
`
