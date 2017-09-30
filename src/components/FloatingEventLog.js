import React from 'react'
import { View, ScrollView, Text } from 'react-native'

export const FloatingEventLog = ({ events, env }) => (
  <View
    style={{ position: 'absolute', marginLeft: 40, minWidth: 100, backgroundColor: 'transparent' }}
  >
    <Text
      style={{
        position: 'absolute',
        color: 'white',
        marginLeft: 200,
        width: 100,
      }}
    >
      {env}
    </Text>
    <ScrollView
      style={{ height: 60 }}
      ref={ref => (this.scrollView = ref)}
      onContentSizeChange={() => {
        this.scrollView.scrollToEnd({ animated: true })
      }}
    >
      {events.map((x, i) => (
        <View key={i}>
          <Text style={{ color: 'white' }}>{x}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
)
