import React from 'react'
import { Image, TouchableWithoutFeedback, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { phonecall } from 'react-native-communications'

import { setPatient } from '../ducks/actions'
import {
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  DARK_THEME_BACKGROUND_COLOR,
  DARK_THEME_TEXT_COLOR,
  LIGHT_THEME_ALT_TEXT_COLOR,
  PRIMARY_COLOR,
  SMALL_FONT,
  LIGHT_THEME_BUTTON_BORDER_COLOR,
  LIGHT_THEME_BACKGROUND_COLOR,
  MINI_FONT,
  REGULAR_FONT,
  LIGHT_THEME_GRAY_TEXT_COLOR,
  LARGE_FONT,
  LIGHT_THEME_TEXT_COLOR,
} from '../constants'
import { MeasureDays } from '../modules/advice/containers/MeasureDays'
import { unreadMessagesQuery } from '../graphql'
import { TabBarIcon } from '../components'

@withApollo
export class _AskScreen extends React.Component {
  static navigationOptions = () => ({
    title: '问医生',
    headerLeft: null,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        source={
          focused
            ? require('../assets/images/tab-icon-doctor-2.png')
            : require('../assets/images/tab-icon-doctor-1.png')
        }
      />
    ),
  })

  state = {}

  goChat = () => {
    this.props.navigation.navigate('Chat', { patientId: this.props.patientId })
  }

  async componentDidMount() {
    this.getUnreadMessages()
    if (!DeviceInfo.isEmulator()) this.intervalId = setInterval(this.getUnreadMessages, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getUnreadMessages = async () => {
    if (this.props.patientState === 'ACTIVE' && this.props.patientId) {
      const result = await this.props.client.query({
        query: unreadMessagesQuery,
        variables: {
          userId: this.props.patientId,
        },
        fetchPolicy: 'network-only',
      })
      const { unreadMessages, loading, error } = result.data
      // if (error) return
      if (!error && !loading) {
        this.setState({
          unreadMessages,
        })
      }
    }
  }

  render() {
    if (this.props.patientState === 'ACTIVE') {
      return (
        <RootView>
          <TopContent>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar>
                <Image
                  style={{ height: 60, width: 60 }}
                  source={require('../assets/images/icon-doctor.png')}
                />
              </Avatar>
              <WhiteText>糖尿病共同照护团队</WhiteText>
            </View>
            <TouchableWithoutFeedback onPress={this.goChat}>
              <SomeButton>
                <PullLeft>
                  <Image
                    style={{ height: 15, width: 15 }}
                    source={require('../assets/images/icon-chat.png')}
                  />
                </PullLeft>
                <SomeButtonText>发消息</SomeButtonText>
                <PullRight>
                  {!!this.state.unreadMessages && (
                    <SomeNotification>
                      <SomeNotificationText>{this.state.unreadMessages}</SomeNotificationText>
                    </SomeNotification>
                  )}
                </PullRight>
              </SomeButton>
            </TouchableWithoutFeedback>
          </TopContent>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
            }}
          >
            <Title>医生提醒您</Title>
          </View>
          <BottomContent>
            <MeasureDays patientId={this.props.patientId} />
          </BottomContent>
        </RootView>
      )
    }

    return (
      <RootView>
        <View style={{ margin: 40 }}>
          <GrayText1>您还没有在糖尿病共同照护门诊就诊过，还不能与医生聊天，如果您或您的家人有糖尿病方面问题，拨打我们的客服电话，预约共同照护门诊。</GrayText1>
        </View>
        <View style={{ margin: 15 }}>
          <GrayText2>门诊预约电话</GrayText2>
        </View>
        <TouchableWithoutFeedback onPress={() => phonecall('4000006813', false)}>
          <MobileText>400-000-6813</MobileText>
        </TouchableWithoutFeedback>
      </RootView>
    )
  }
}

const mapStateToProps = state => ({
  patientId: state.appData.patientId,
  patientState: state.appData.patientState,
})

const mapDispatchToProps = dispatch => ({ setPatient: g => dispatch(setPatient(g)) })

export const AskScreen = connect(mapStateToProps, mapDispatchToProps)(_AskScreen)

const GrayText1 = styled.Text`
  font-size: ${REGULAR_FONT};
  color: ${LIGHT_THEME_GRAY_TEXT_COLOR};
`

const MobileText = styled.Text`
  font-size: ${LARGE_FONT};
  color: ${LIGHT_THEME_TEXT_COLOR};
  text-align: center;
`

const GrayText2 = styled.Text`
  font-size: ${SMALL_FONT};
  color: ${LIGHT_THEME_GRAY_TEXT_COLOR};
  text-align: center;
`

const RootView = styled.View`
  flex: 1;
  background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};
`
const TopContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${DARK_THEME_BACKGROUND_COLOR};
`
const BottomContent = styled.View`
  flex: 4;
  background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};
`
const WhiteText = styled.Text`
  font-size: ${SMALL_FONT};
  color: ${DARK_THEME_TEXT_COLOR};
`
const SomeButton = styled.View`
  width: 90;
  flex-direction: row;
  border-width: 1;
  border-radius: 4;
  padding-left: 5;
  padding-top: 5;
  padding-bottom: 5;
  margin-left: 15;
  margin-right: 5;
  border-color: ${LIGHT_THEME_BUTTON_BORDER_COLOR};
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
  align-items: center;
`
const PullLeft = styled.View`
  flex: 1;
  align-items: flex-start;
`
const PullRight = styled.View`
  flex: 1;
  align-items: flex-end;
`
const SomeButtonText = styled.Text`
  font-size: ${SMALL_FONT};
  color: ${PRIMARY_COLOR};
`
const SomeNotification = styled.View`
  border-width: 1;
  border-color: rgb(255, 85, 0);
  border-radius: 15;
  padding: 3px;
  height: 20;
  width: 20;
  top: -5px;
  background-color: rgb(255, 85, 0);
`
const SomeNotificationText = styled.Text`
  font-size: ${MINI_FONT};
  text-align: center;
  color: ${DARK_THEME_TEXT_COLOR};
`
const Title = styled.Text`
  font-size: ${SMALL_FONT};
  color: ${LIGHT_THEME_ALT_TEXT_COLOR};
`

const Avatar = styled.View`margin: 10px;`
