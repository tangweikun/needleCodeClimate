import React from 'react'
import { SelectFood } from '../modules/diet/SelectFood'

export class SelectFoodScreen extends React.Component {
  static navigationOptions = () => ({
    title: '选择食物',
  })

  render() {
    return <SelectFood navigation={this.props.navigation} />
  }
}
