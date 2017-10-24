import React from 'react'
import { DevelopingFeature } from '../components'

export class FeedbackScreen extends React.Component {
  static navigationOptions = () => ({
    title: '意见反馈',
  })

  render() {
    return <DevelopingFeature />
  }
}
