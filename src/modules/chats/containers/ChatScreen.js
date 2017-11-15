import * as React from 'react'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import { ActivityIndicator } from 'react-native'
import { withApollo, graphql } from 'react-apollo'
import { GiftedChat } from 'react-native-gifted-chat'
import styled from 'styled-components/native'
import { PRIMARY_COLOR, defaultDoctorAvatar } from '../../../constants'
import {
  messagesQuery,
  sendNeedleTextChatMessage,
  updateLastSeenAt,
  subscriptionMessage,
} from '../../../graphql'
import { Bubble, Message, InputToolbar } from '../components'
import { InternetError } from '../../../components'

@withApollo
class _Chat extends React.Component {
  componentWillMount() {
    this.props.subscribeToNewFeedback()
  }

  componentWillUnmount() {
    this.props.client
      .mutate({
        mutation: updateLastSeenAt,
        variables: {
          userId: this.props.patientId,
          chatRoomId: get(this.props.MessageList.fetchOrCreateNeedleChatRoom, '_id'),
        },
      })
      .catch(null)
  }

  onSend = messages => {
    this.props.client.mutate({
      mutation: sendNeedleTextChatMessage,
      variables: {
        userId: this.props.patientId,
        chatRoomId: get(this.props.MessageList.fetchOrCreateNeedleChatRoom, '_id'),
        text: messages[0].text,
      },
    })
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
        avatar: message.sender.avatar || defaultDoctorAvatar,
      },
    }))

    return orderBy(formatMessage, ['createdAt'], ['desc'])
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

  renderMessage = props => <Message {...props} />

  renderInputToolbar = props => <InputToolbar {...props} />

  render() {
    const { MessageList, patientId } = this.props
    if (MessageList.error) {
      return <InternetError error={JSON.stringify(MessageList.error.message)} />
    }
    if (MessageList.loading) {
      return <ActivityIndicator animating size="large" color={PRIMARY_COLOR} />
    }

    return (
      <ExpandingView>
        <GiftedChat
          showUserAvatar
          locale="zh-cn"
          messages={this.sortMessagesByCreatedAt(
            get(MessageList.fetchOrCreateNeedleChatRoom, 'messages', []),
          )}
          onSend={this.onSend}
          user={{ _id: patientId }}
          renderChatFooter={this.renderChatFooter}
          renderBubble={this.renderBubble}
          placeholder="请输入..."
          label="发送"
          renderAvatarOnTop
          renderMessage={this.renderMessage}
          renderInputToolbar={this.renderInputToolbar}
        />
      </ExpandingView>
    )
  }
}

export const Chat = graphql(messagesQuery, {
  name: 'MessageList',
  options: props => ({ variables: { userId: props.patientId } }),
  props: props => ({
    ...props,
    subscribeToNewFeedback: () =>
      props.MessageList.subscribeToMore({
        document: subscriptionMessage,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.chatMessageAdded) {
            return prev
          }
          const newMessage = subscriptionData.chatMessageAdded

          if (!prev.fetchOrCreateNeedleChatRoom.messages.find(msg => msg._id === newMessage._id)) {
            return {
              ...prev,
              fetchOrCreateNeedleChatRoom: {
                ...prev.fetchOrCreateNeedleChatRoom,
                messages: [...prev.fetchOrCreateNeedleChatRoom.messages, newMessage],
              },
            }
          }
          return prev
        },
      }),
  }),
})(_Chat)

const ExpandingView = styled.View`flex: 1;`
