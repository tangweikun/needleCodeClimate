import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Day, SystemMessage, utils } from 'react-native-gifted-chat'
import Bubble from './Bubble'
import Avatar from './Avatar'

const { isSameUser, isSameDay } = utils

export default class Message extends React.Component {
  getInnerComponentProps() {
    const { containerStyle, ...props } = this.props
    return {
      ...props,
      isSameUser,
      isSameDay,
    }
  }

  renderDay() {
    if (this.props.currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps()
      if (this.props.renderDay) {
        return this.props.renderDay(dayProps)
      }
      return <Day {...dayProps} />
    }
    return null
  }

  renderBubble() {
    const bubbleProps = this.getInnerComponentProps()
    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps)
    }
    return <Bubble {...bubbleProps} />
  }

  renderSystemMessage() {
    const systemMessageProps = this.getInnerComponentProps()
    if (this.props.renderSystemMessage) {
      return this.props.renderSystemMessage(systemMessageProps)
    }
    return <SystemMessage {...systemMessageProps} />
  }

  renderAvatar() {
    if (!this.props.showUserAvatar) {
      return null
    }
    const avatarProps = this.getInnerComponentProps()
    const { currentMessage } = avatarProps
    if (currentMessage.user.avatar === null) {
      return null
    }
    return <Avatar {...avatarProps} />
  }

  render() {
    return (
      <View>
        {this.renderDay()}
        {this.props.currentMessage.system ? (
          this.renderSystemMessage()
        ) : (
          <View
            style={[
              styles[this.props.position].container,
              {
                marginBottom: isSameUser(this.props.currentMessage, this.props.nextMessage)
                  ? 2
                  : 10,
              },
              this.props.containerStyle[this.props.position],
            ]}
          >
            {this.props.position === 'left' ? this.renderAvatar() : null}
            {this.renderBubble()}
            {this.props.position === 'right' ? this.renderAvatar() : null}
          </View>
        )}
      </View>
    )
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8,
    },
  }),
}

Message.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  renderSystemMessage: null,
  position: 'left',
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {},
}