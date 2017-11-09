import * as React from 'react'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import { ActivityIndicator, View } from 'react-native'
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

@withApollo
class _Chat extends React.Component {
  state = {
    chatRoomId: '',
    messages: [],
    loading: true,
  }

  componentWillMount() {
    this.props.subscribeToNewFeedback()

    // this.props.data.subscribeToMore({
    //   document: subscriptionMessage,
    //   updateQuery: (prev, { subscriptionData }) => {
    //     // console.log(44444, prev, subscriptionData.data)
    //     if (!subscriptionData.data) {
    //       return prev
    //     }
    //     const newMessage = subscriptionData.data.chatMessageAdded
    //     console.log(newMessage, 4442323, prev.fetchOrCreateNeedleChatRoom.messages)
    //     // don't double add the message
    //     if (!prev.fetchOrCreateNeedleChatRoom.messages.find(msg => msg._id === newMessage._id)) {
    //       console.log(222, prev.fetchOrCreateNeedleChatRoom.messages)
    //       return {
    //         ...prev,
    //         fetchOrCreateNeedleChatRoom: {
    //           ...prev.fetchOrCreateNeedleChatRoom,
    //           messages: [...prev.fetchOrCreateNeedleChatRoom.messages, newMessage],
    //         },
    //       }
    //       // return Object.assign({}, prev, {
    //       //   fetchOrCreateNeedleChatRoom: Object.assign({}, prev.fetchOrCreateNeedleChatRoom, {
    //       //     messages: [...prev.fetchOrCreateNeedleChatRoom.messages, newMessage],
    //       //   }),
    //       // })
    //     }
    //     return prev
    //   },
    // })
  }

  async componentDidMount() {
    this.fetchMessages()
    // if (!DeviceInfo.isEmulator()) this.intervalId = setInterval(this.fetchMessages, 3000)
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
        avatar: message.sender.avatar || defaultDoctorAvatar,
      },
    }))

    return orderBy(formatMessage, ['createdAt'], ['desc'])
  }

  fetchMessages = async () => {
    if (this.props.patientId) {
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
          loading: false,
        })
      }
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

  renderMessage = props => <Message {...props} />

  renderInputToolbar = props => <InputToolbar {...props} />

  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator animating size="large" color={PRIMARY_COLOR} />
        </View>
      )
    }
    return (
      <ExpandingView>
        <GiftedChat
          showUserAvatar
          locale="zh-cn"
          messages={this.sortMessagesByCreatedAt(
            get(this.props.MessageList.fetchOrCreateNeedleChatRoom, 'messages', []),
          )}
          onSend={this.onSend}
          user={{ _id: this.props.patientId }}
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
          console.log('New Feedback Item', { props, prev }, subscriptionData.chatMessageAdded)
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
