import React from 'react'
import { ReviewMealSelection } from '../modules/diet/ReviewMealSelection'

export class ReviewMealSelectionScreen extends React.Component {
  static navigationOptions = () => ({
    title: '代币结算',
  })

  render() {
    return <ReviewMealSelection navigation={this.props.navigation} />
  }
}
