import * as React from 'react'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'

import { withApollo } from 'react-apollo'
import { GiftedChat } from 'react-native-gifted-chat'
import { ExpandingView } from 'react-native-jans-common-components'
import Bubble from './Bubble'
import { PRIMARY_COLOR, defaultAvatar } from '../../../constants'
import { messagesQuery, sendNeedleTextChatMessage, updateLastSeenAt } from '../../../graphql'

@withApollo
export class Chat extends React.Component {
  state = {
    chatRoomId: '',
    messages: [],
  }

  async componentDidMount() {
    this.fetchMessages()
    this.intervalId = setInterval(this.fetchMessages, 3000)
  }

  componentWillUnmount() {
    this.props.client.mutate({
      mutation: updateLastSeenAt,
      variables: {
        userId: this.props.patientId,
        chatRoomId: this.state.chatRoomId,
      },
    })

    clearInterval(this.intervalId)
  }

  onSend = messages => {
    this.props.client
      .mutate({
        mutation: sendNeedleTextChatMessage,
        variables: {
          userId: this.props.patientId,
          chatRoomId: this.state.chatRoomId,
          text: messages[0].text,
        },
      })
      .then(this.fetchMessages)
      .catch(console.error)
  }

  sortMessagesByCreatedAt = messages => {
    const formatMessage = messages.map(message => ({
      _id: message._id,
      text: message.text,
      audioUrl: message.audioUrl,
      image: message.imageUrl,
      createdAt: message.createdAt,
      user: {
        _id: message.sender._id,
        name: message.sender.nickname,
        avatar: message.sender.avatar || defaultAvatar,
      },
    }))

    return orderBy(formatMessage, ['createdAt'], ['desc'])
  }

  fetchMessages = async () => {
    const result = await this.props.client.query({
      query: messagesQuery,
      variables: {
        userId: this.props.patientId,
      },
      fetchPolicy: 'network-only',
    })

    const { fetchOrCreateNeedleChatRoom, loading, error } = result.data

    if (!error && !loading && fetchOrCreateNeedleChatRoom) {
      const chatRoomId = get(fetchOrCreateNeedleChatRoom, '_id')
      const messages = this.sortMessagesByCreatedAt(
        get(fetchOrCreateNeedleChatRoom, 'messages', []),
      )

      this.setState({
        chatRoomId,
        messages,
      })
    }
  }

  renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#f0f0f0',
        },
        right: {
          backgroundColor: PRIMARY_COLOR,
        },
      }}
    />
  )

  render() {
    return (
      <ExpandingView>
        <GiftedChat
          showUserAvatar
          locale="zh-cn"
          messages={this.state.messages}
          onSend={this.onSend}
          user={{ _id: this.props.patientId }}
          renderChatFooter={this.renderChatFooter}
          renderBubble={this.renderBubble}
          placeholder="请输入..."
          label="发送"
        />
      </ExpandingView>
    )
  }
}
