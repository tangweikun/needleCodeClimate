import * as React from 'react'
import { Text, Image, View, Alert, TouchableWithoutFeedback, Dimensions } from 'react-native'
import styled from 'styled-components/native'

import { LIGHT_THEME_ALT_TEXT_COLOR } from '../constants'
import { Button } from '../components'

export class IntroductionScreen extends React.Component {
  static navigationOptions = () => ({
    title: '糖尿病共同照护门诊介绍',
  })
  render() {
    return (
      <RootView>
        <Image
          source={require('../assets/images/boarding.jpg')}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').width * 4.6,
          }}
        />

        <View
          style={{
            backgroundColor: LIGHT_THEME_ALT_TEXT_COLOR,
            height: 180,
            justifyContent: 'center',
          }}
        >
          <Button
            title="我要预约门诊"
            onPress={() =>
              Alert.alert('谢谢', '我们已收到您的门诊预约请求，随后将有护士跟您联系确认', [
                {
                  text: '知道了',
                  onPress: () => this.props.navigation.navigate('HomeTab'),
                },
              ])}
          />
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomeTab')}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>随便看看</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </RootView>
    )
  }
}

const RootView = styled.ScrollView``
