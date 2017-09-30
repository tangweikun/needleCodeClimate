import React from 'react'
import { View, Text } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { LIGHT_GRAY, LIGHT_WHITE, REGULAR_FONT } from '../constants'

export const InternetError = ({ error }) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: LIGHT_WHITE,
    }}
  >
    <Text style={{ color: LIGHT_GRAY, fontSize: REGULAR_FONT }}>
      {DeviceInfo.isEmulator() ? error : '网络加载错误'}
    </Text>
  </View>
)
