import React from 'react'
import { Chat } from '../modules/chats'

export class ChatScreen extends React.Component {
  static navigationOptions = () => ({
    title: '糖尿病共同照护团队',
  })

  render() {
    return <Chat patientId={this.props.navigation.state.params.patientId} />
  }
}
