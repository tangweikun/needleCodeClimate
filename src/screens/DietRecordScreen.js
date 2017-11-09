import React from 'react'
import { DietRecord } from '../modules/diet/DietRecord'

export class DietRecordScreen extends React.Component {
  static navigationOptions = () => ({
    title: '代币记录',
  })

  render() {
    return <DietRecord navigation={this.props.navigation} />
  }
}
