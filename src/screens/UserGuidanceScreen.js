import React from 'react'
import { DevelopingFeature } from '../components'

export class UserGuidanceScreen extends React.Component {
  static navigationOptions = () => ({
    title: '使用指南',
  })

  render() {
    return <DevelopingFeature />
  }
}
