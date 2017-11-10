import React from 'react'
import { View, FlatList, Alert, AsyncStorage } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import moment from 'moment'
import { NavigationActions } from 'react-navigation'

import { setPatient } from '../ducks/actions'
import { RowWithRightIcon, RowWithValue, Button } from '../components'
import { gender } from '../i18n'
import {
  defaultMaleAvatar,
  defaultFemaleAvatar,
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  GRAY230,
  DARK_RED,
} from '../constants'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'LoginOrSignUp' })],
})

class _AboutMe extends React.Component {
  render() {
    const { avatar, nickname, birthday, patientState } = this.props.appData
    const defaultAvatar =
      this.props.appData.gender === 'female' ? defaultFemaleAvatar : defaultMaleAvatar

    return (
      <RootView>
        <MarginTopView>
          <FlatList
            data={[
              {
                key: '头像',
                onPress: () => console.log('update avatar'),
                image: avatar ? { uri: avatar } : defaultAvatar,
              },
              {
                key: '姓名',
                onPress: () => console.log('update nickname'),
                value: nickname || '- -',
              },
            ]}
            renderItem={({ item }) => {
              if (item.key === '头像') {
                return (
                  <RowWithRightIcon
                    title={item.key}
                    onPress={() => item.onPress()}
                    image={item.image}
                  />
                )
              }
              return (
                <RowWithValue title={item.key} value={item.value} onPress={() => item.onPress()} />
              )
            }}
            ItemSeparatorComponent={() => <SeparatorLine />}
          />
        </MarginTopView>

        <MarginTopView>
          <FlatList
            data={[
              {
                key: '性别',
                onPress: () => console.log('update gender'),
                value: gender[this.props.appData.gender] || '- -',
              },
              {
                key: '生日',
                onPress: () => console.log('update birthday'),
                value: birthday ? moment(birthday).format('YYYY-MM-DD') : '- -',
              },
            ]}
            renderItem={({ item }) => (
              <RowWithValue title={item.key} value={item.value} onPress={() => item.onPress()} />
            )}
            ItemSeparatorComponent={() => <SeparatorLine />}
          />
        </MarginTopView>

        <MarginTopView>
          <RowWithValue
            title="门诊认证"
            color={DARK_RED}
            value={patientState === 'ACTIVE' ? '照护门诊' : '未认证'}
            onPress={() => console.log('show alert')}
          />
        </MarginTopView>

        <View style={{ marginTop: 120 }}>
          <Button
            title="退出登录"
            dark
            color="red"
            onPress={() =>
              Alert.alert('确定退出登录?', '', [
                {
                  text: '取消',
                },
                {
                  text: '退出',
                  onPress: () => {
                    this.props.setPatient({})
                    AsyncStorage.removeItem('userInfo')
                    this.props.navigation.dispatch(resetAction)
                  },
                },
              ])}
          />
        </View>
      </RootView>
    )
  }
}

const mapStateToProps = state => ({ appData: state.appData })

const mapDispatchToProps = dispatch => ({
  setPatient: g => dispatch(setPatient(g)),
})

export const AboutMe = connect(mapStateToProps, mapDispatchToProps)(_AboutMe)

const RootView = styled.ScrollView`
  background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};
  flex: 1;
`

const MarginTopView = styled.View`margin-top: 10px;`

const SeparatorLine = styled.View`
  height: 1;
  background-color: ${GRAY230};
`
