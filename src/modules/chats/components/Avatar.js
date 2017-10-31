import React from 'react'
import { StyleSheet, View } from 'react-native'
import { utils, GiftedAvatar } from 'react-native-gifted-chat'

const { isSameUser, isSameDay, warnDeprecated } = utils

export class Avatar extends React.Component {
  renderAvatar() {
    if (this.props.renderAvatar) {
      const { renderAvatar, ...avatarProps } = this.props
      return this.props.renderAvatar(avatarProps)
    }
    return (
      <GiftedAvatar
        avatarStyle={StyleSheet.flatten([
          styles[this.props.position].image,
          this.props.imageStyle[this.props.position],
        ])}
        user={this.props.currentMessage.user}
        onPress={() =>
          this.props.onPressAvatar && this.props.onPressAvatar(this.props.currentMessage.user)}
      />
    )
  }

  render() {
    const renderAvatarOnTop = this.props.renderAvatarOnTop
    // const messageToCompare = renderAvatarOnTop ? this.props.previousMessage : this.props.nextMessage
    const computedStyle = renderAvatarOnTop ? 'onTop' : 'onBottom'

    if (this.props.renderAvatar === null) {
      return null
    }

    // if (
    //   isSameUser(this.props.currentMessage, messageToCompare) &&
    //   isSameDay(this.props.currentMessage, messageToCompare)
    // ) {
    //   return (
    //     <View
    //       style={[
    //         styles[this.props.position].container,
    //         this.props.containerStyle[this.props.position],
    //       ]}
    //     >
    //       <GiftedAvatar
    //         avatarStyle={StyleSheet.flatten([
    //           styles[this.props.position].image,
    //           this.props.imageStyle[this.props.position],
    //         ])}
    //       />
    //     </View>
    //   )
    // }

    return (
      <View
        style={[
          styles[this.props.position].container,
          styles[this.props.position][computedStyle],
          this.props.containerStyle[this.props.position],
        ]}
      >
        {this.renderAvatar()}
      </View>
    )
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
}

Avatar.defaultProps = {
  renderAvatarOnTop: false,
  position: 'left',
  currentMessage: {
    user: null,
  },
  nextMessage: {},
  containerStyle: {},
  imageStyle: {},
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser),
}
