import * as React from 'react'
import { Text, Image, View, Alert, TouchableWithoutFeedback, Dimensions } from 'react-native'
import styled from 'styled-components/native'

import { LIGHT_THEME_ALT_TEXT_COLOR } from '../constants'
import { NickButton } from '../components'

// const introduction =
//   '共同照护是一种全新的治疗与管理糖尿病的医疗模式。它加入了营养师，护理师、运动等专家，组成一个医疗专家团队。通过门诊和线上院外服务相结合的方式，为糖友提供综合的、全程的病情管控服务, 目标是希望糖友提高认知，自我管理，自我改善血糖水平。'

// const roles = [
//   {
//     role: '医生',
//     description: '负责您的病情问诊，根据各项检验数据对您病情做出关键诊断',
//     avatar: require('../assets/images/pic-doctor.png'),
//   },
//   {
//     role: '营养师',
//     description: '评估您的营养状况及饮食习惯，根据病情提出个性化的营养建议和方案',
//     avatar: require('../assets/images/pic-nurse.png'),
//   },
//   {
//     role: '卫教师',
//     description: '为您提供全面的健康教育服务，包括血糖监测，服药管理以及紧急情况的处理方法',
//     avatar: require('../assets/images/pic-teacher.png'),
//   },
// ]

// const RolesIntroduction = ({ info }) => (
//   <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//     <View style={{ marginRight: 10 }}>
//       <Image source={info.avatar} style={{ height: 100, width: 100 }} />
//       <View style={{ height: 80, alignItems: 'center', justifyContent: 'center' }}>
//         <Text style={{ fontSize: 40, color: '#fff' }}>+</Text>
//       </View>
//     </View>

//     <View style={{ width: 200 }}>
//       <Text style={{ fontSize: REGULAR_FONT, color: '#fff' }}>{info.role}</Text>
//       <Text style={{ fontSize: SMALL_FONT, color: '#fff' }}>{info.description}</Text>
//     </View>
//   </View>
// )

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
          <NickButton
            light
            onPress={() =>
              Alert.alert('谢谢，我们已收到您的门诊预约请求，随后将有护士跟您联系确认', '', [
                {
                  text: '知道了',
                  onPress: () => this.props.navigation.navigate('HomeTab'),
                },
              ])}
          >
            我要预约门诊
          </NickButton>
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
