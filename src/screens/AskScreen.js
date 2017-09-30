import React from 'react'
import { Image, TouchableWithoutFeedback, View } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { setPatient } from '../ducks/actions'

import {
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  DARK_THEME_BACKGROUND_COLOR,
  DARK_THEME_TEXT_COLOR,
  LIGHT_THEME_ALT_TEXT_COLOR,
  DigestiveStateLabel,
  DayLabel,
  PRIMARY_COLOR,
} from '../constants'
import { MeasureDays } from '../modules/advice/containers/MeasureDays'
import { unreadMessagesQuery } from '../graphql'

@withApollo
export class _AskScreen extends React.Component {
  static navigationOptions = () => ({
    title: '问医生',
    headerLeft: null,
    tabBarIcon: ({ focused }) =>
      (focused ? (
        <Image
          style={{ height: 20, width: 22 }}
          source={require('../assets/images/tab-icon-doctor-2.png')}
        />
      ) : (
        <Image
          style={{ height: 20, width: 22 }}
          source={require('../assets/images/tab-icon-doctor-1.png')}
        />
      )),
  })

  state = {}

  goChat = () => {
    this.props.navigation.navigate('Chat', { patientId: this.props.appData.patientId })
  }

  async componentDidMount() {
    this.getUnreadMessages()
    this.intervalId = setInterval(this.getUnreadMessages, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getUnreadMessages = async () => {
    const result = await this.props.client.query({
      query: unreadMessagesQuery,
      variables: {
        userId: this.props.appData.patientId,
      },
      fetchPolicy: 'network-only',
    })
    const { unreadMessages, loading, error } = result.data

    if (!error && !loading) {
      this.setState({
        unreadMessages,
      })
    }
  }

  render() {
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
          <MeasureDays patientId={this.props.appData.patientId} />
        </BottomContent>
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

export const AskScreen = connect(mapStateToProps, mapDispatchToProps)(_AskScreen)
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
  font-size: 14;
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
  marginLeft: 15;
  marginRight: 5;
  border-color: white;
  background-color: #fff;
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
  font-size: 14;
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
  font-size: 10;
  text-align: center;
  color: ${DARK_THEME_TEXT_COLOR};
`
const Title = styled.Text`
  font-size: 16;
  color: ${LIGHT_THEME_ALT_TEXT_COLOR};
`

const Avatar = styled.View`
  height: 60;
  width: 60;
  margin: 10px;
`

// const measureDays = times => Object.entries(times).filter(x => x[1].length)
// const displayMeasureTimes = measureDay =>
//   `${DayLabel[measureDay[0]]}:  ${digestiveStateArrayToString(measureDay[1])}`
// const digestiveStateArrayToString = array => array.map(x => DigestiveStateLabel[x]).join(',  ')
