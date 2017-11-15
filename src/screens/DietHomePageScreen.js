import React from 'react'
import { View, TouchableWithoutFeedback, Image } from 'react-native'
import { TabBarIcon } from '../components'
import { DietHomePage } from '../modules/diet/DietHomePage'

export class DietHomePageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '饮食',
    headerLeft: <View />,
    headerRight: (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('DietRecord')}>
        <View style={{ alignItems: 'center', padding: 15 }}>
          <Image
            style={{ height: 22, width: 22 }}
            source={require('../assets/images/icon_diet_history.png')}
          />
        </View>
      </TouchableWithoutFeedback>
    ),
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        source={
          focused
            ? require('../assets/images/icon-tabbar-diet-Active.png')
            : require('../assets/images/icon-tabbar-diet-Inactive.png')
        }
      />
    ),
  })

  render() {
    return <DietHomePage navigation={this.props.navigation} />
  }
}
