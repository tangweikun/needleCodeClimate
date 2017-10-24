import React from 'react'
import { AboutMe } from '../modules/AboutMe'

export class AboutMeScreen extends React.Component {
  static navigationOptions = () => ({
    title: '个人信息',
  })

  render() {
    return <AboutMe navigation={this.props.navigation} />
  }
}
