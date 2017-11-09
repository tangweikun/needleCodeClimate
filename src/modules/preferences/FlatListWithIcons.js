import * as React from 'react'
import { FlatList, View, StyleSheet, Alert } from 'react-native'
import { LIGHT_THEME_BACKGROUND_COLOR } from '../../constants'
import { RowWithIconAndDisclosureIndicator } from '../../components'

export const FlatListWithIcons = ({ onAboutUsPress, onSignOutPress, onIntroductionPress }) => (
  <FlatList
    data={[
      {
        key: '关于我们',
        onPress: () => {
          onAboutUsPress()
        },
        iconName: require('../../assets/images/icon-aboutus.png'),
      },
      {
        key: '糖尿病共同照护门诊介绍',
        onPress: () => {
          onIntroductionPress()
        },
        iconName: require('../../assets/images/icon-gtzh.png'),
      },
      {
        key: '退出',
        onPress: () =>
          Alert.alert('确定退出吗？', '', [
            {
              text: '取消',
              onPress: () => console.log('cancel logout'),
            },
            {
              text: '退出登录',
              onPress: () => onSignOutPress(),
            },
          ]),
        iconName: require('../../assets/images/icon-logout.png'),
      },
    ]}
    renderItem={({ item }) => (
      <RowWithIconAndDisclosureIndicator
        iconName={item.iconName}
        title={item.key}
        onPress={() => item.onPress()}
      />
    )}
    ItemSeparatorComponent={() => (
      <View
        style={{
          marginLeft: 20,
          height: StyleSheet.hairlineWidth,
          borderColor: LIGHT_THEME_BACKGROUND_COLOR,
        }}
      />
    )}
  />
)
