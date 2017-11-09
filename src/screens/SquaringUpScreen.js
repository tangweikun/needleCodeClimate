import React from 'react'
import { SquaringUp } from '../modules/diet/SquaringUp'

export class SquaringUpScreen extends React.Component {
  static navigationOptions = () => ({
    title: '代币结算',
  })

  render() {
    return <SquaringUp navigation={this.props.navigation} />
  }
}
