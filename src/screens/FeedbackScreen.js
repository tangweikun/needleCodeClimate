import React from 'react'
import { View, TextInput, Alert } from 'react-native'
import { withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { LIGHT_THEME_BACKGROUND_COLOR, SMALL_FONT } from '../constants'
import { Button } from '../components'
import { submitFeedbackMutation } from '../graphql'

@withApollo
class _FeedbackScreen extends React.Component {
  static navigationOptions = () => ({
    title: '意见反馈',
  })

  state = { text: '' }

  onSubmitPress = async () => {
    await this.props.client
      .mutate({
        mutation: submitFeedbackMutation,
        variables: { text: this.state.text, patientId: this.props.patientId },
      })
      .catch(() => null)
    this.props.navigation.goBack()
    Alert.alert('谢谢!', '感谢您的反馈.')
  }

  render() {
    return (
      <View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 40,
          }}
        >
          <TextInput
            style={{
              height: 130,
              backgroundColor: LIGHT_THEME_BACKGROUND_COLOR,
              // marginHorizontal: 20,
              padding: 16,
              textAlignVertical: 'top',
              fontSize: SMALL_FONT,
            }}
            value={this.state.text}
            multiline
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({ text })}
            placeholder="请输入反馈，您的反馈将是我们不断改进的动力"
            placeholderTextColor="gray"
          />
        </View>
        <Button dark title="提交反馈" onPress={this.onSubmitPress} />
      </View>
    )
  }
}

const mapStateToProps = state => ({ patientId: state.appData.patientId })

const mapDispatchToProps = () => ({})

export const FeedbackScreen = connect(mapStateToProps, mapDispatchToProps)(_FeedbackScreen)
