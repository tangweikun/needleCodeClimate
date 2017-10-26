import React from 'react'
import { BodyFile } from '../modules/BodyFile'

export class BodyFileScreen extends React.Component {
  static navigationOptions = () => ({
    title: '身体档案',
  })

  render() {
    return <BodyFile />
  }
}
