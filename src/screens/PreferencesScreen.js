import React from 'react'
import { TabBarIcon } from '../components'
import { Preferences } from '../modules/preferences'

export class PreferencesScreen extends React.Component {
  static navigationOptions = () => ({
    title: '个人中心',
    headerLeft: null,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        source={
          focused
            ? require('../assets/images/tab-icon-profile-1.png')
            : require('../assets/images/tab-icon-profile-2.png')
        }
      />
    ),
  })

  render() {
    return <Preferences navigation={this.props.navigation} />
  }
}
