import React from 'react'
import { View, FlatList, Alert, AsyncStorage } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import moment from 'moment'

import { toggleDevMode, setPatient } from '../ducks/actions'
import {
  RowWithRightIconAndDisclosureIndicator,
  RowWithValueAndDisclosureIndicator,
  RowWithValue,
} from './preferences/Row'
import { gender } from '../i18n'
import {
  defaultUserAvatar,
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  GRAY230,
  DARK_RED,
} from '../constants'
import { Button } from '../components'

class _AboutMe extends React.Component {
  render() {
    return (
      <RootView>
        <MarginTopView>
          <FlatList
            data={[
              {
                key: '头像',
                onPress: () => console.log('update avatar'),
                image: { uri: this.props.appData.avatar || defaultUserAvatar },
              },
              {
                key: '姓名',
                onPress: () => console.log('update nickname'),
                value: this.props.appData.nickname,
              },
            ]}
            renderItem={({ item }) => {
              if (item.key === '头像') {
                return (
                  <RowWithRightIconAndDisclosureIndicator
                    title={item.key}
                    onPress={() => item.onPress()}
                    image={item.image}
                  />
                )
              }
              return (
                <RowWithValueAndDisclosureIndicator
                  title={item.key}
                  value={item.value}
                  onPress={() => item.onPress()}
                />
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
                value: gender[this.props.appData.gender] || '未填',
              },
              {
                key: '生日',
                onPress: () => console.log('update birthday'),
                value: this.props.appData.birthday
                  ? moment(this.props.appData.birthday).format('YYYY-MM-DD')
                  : '未填',
              },
            ]}
            renderItem={({ item }) => (
              <RowWithValueAndDisclosureIndicator
                title={item.key}
                value={item.value}
                onPress={() => item.onPress()}
              />
            )}
            ItemSeparatorComponent={() => <SeparatorLine />}
          />
        </MarginTopView>

        <MarginTopView>
          <RowWithValue
            title="门诊认证"
            color={DARK_RED}
            value={this.props.appData.patientState === 'ACTIVE' ? '已认证' : '未认证'}
            onPress={() => console.log('show alert')}
          />
        </MarginTopView>

        <View style={{ marginTop: 'auto', marginBottom: 20 }}>
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
                    this.props.navigation.navigate('LoginNavigation')
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
  toggleDevMode: () => dispatch(toggleDevMode()),
  setPatient: g => dispatch(setPatient(g)),
})

export const AboutMe = connect(mapStateToProps, mapDispatchToProps)(_AboutMe)

const RootView = styled.View`
  background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};
  flex: 1;
`

const MarginTopView = styled.View`margin-top: 10px;`

const SeparatorLine = styled.View`
  height: 1;
  background-color: ${GRAY230};
`
