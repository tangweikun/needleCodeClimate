import React from 'react'
import { SelectDigestiveState } from '../modules/diet/SelectDigestiveState'

export class SelectDigestiveStateScreen extends React.Component {
  static navigationOptions = () => ({
    title: '选择餐时',
  })

  render() {
    return <SelectDigestiveState navigation={this.props.navigation} />
  }
}
