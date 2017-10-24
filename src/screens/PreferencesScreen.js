import React from 'react'
import { TabBarIcon } from '../components'
import { Preferences } from '../modules/preferences'

export class PreferencesScreen extends React.Component {
  static navigationOptions = () => ({
    title: '我的',
    headerLeft: null,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        source={
          focused
            ? require('../assets/images/icon-tabbar-mine-Active.png')
            : require('../assets/images/icon-tabbar-mine-Inactive.png')
        }
      />
    ),
  })

  render() {
    return <Preferences navigation={this.props.navigation} />
  }
}
