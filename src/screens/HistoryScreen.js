import React, { Component } from 'react'
import styled from 'styled-components/native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableWithoutFeedback, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { MeasurementHistory } from '../modules/measurement/containers/HistoryTable'
import { PRIMARY_COLOR } from '../constants'

function getStartOfWeek(page) {
  return moment()
    .add(7 * page, 'days')
    .startOf('isoweek')
}

function getEndOfWeek(page) {
  return moment()
    .add(7 * page, 'days')
    .endOf('isoweek')
}

export class HistoryScreen extends Component {
  static navigationOptions = () => ({
    title: '血糖历史',
  })

  state = { patientId: this.props.navigation.state.params.patientId, page: 0 }

  reset() {
    return this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'First' })],
      }),
    )
  }
  render() {
    const { page } = this.state

    return (
      <RootView>
        <SecondHeader>
          <TouchableWithoutFeedback
            onPress={() => this.setState(preState => ({ page: preState.page - 1 }))}
          >
            <IconContainerView>
              <Icon name="keyboard-arrow-left" size={36} color="#727272" />
              <WhiteText>上一周</WhiteText>
            </IconContainerView>
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <PrimaryText>{moment(getStartOfWeek(page)).format('MM月DD日')}</PrimaryText>
            <PrimaryText>-</PrimaryText>
            <PrimaryText>{moment(getEndOfWeek(page)).format('MM月DD日')}</PrimaryText>
          </View>
          <TouchableWithoutFeedback
            onPress={() => this.setState(preState => ({ page: preState.page + 1 }))}
          >
            <IconContainerView>
              <WhiteText>下一周</WhiteText>
              <Icon name="keyboard-arrow-right" size={36} color="#727272" />
            </IconContainerView>
          </TouchableWithoutFeedback>
        </SecondHeader>
        <MeasurementHistory startOfWeek={getStartOfWeek(page)} endOfWeek={getEndOfWeek(page)} />
      </RootView>
    )
  }
}

const WhiteText = styled.Text`color: black;`

const PrimaryText = styled.Text`
  color: ${PRIMARY_COLOR};
  font-weight: bold;
  font-size: 16;
`

const IconContainerView = styled.View`
  flex-direction: row;
  align-items: center;
`

const RootView = styled.View`
  flex: 1;
  align-items: center;
  background-color: #f0f2f5;
`

const SecondHeader = styled.View`
  margin-bottom: 10;
  height: 50;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`
