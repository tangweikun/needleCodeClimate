import React, { Component } from 'react'
import styled from 'styled-components/native'
import { TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { LARGE_FONT } from '../constants'

const KEYBOARD_LABEL = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, 'X']]

export class KeyBoard extends Component {
  state = { inputValue: '' }

  render() {
    return (
      <KeyBoardContainer>
        {KEYBOARD_LABEL.map((item, index) => (
          <KeyBoardRow key={index}>
            {item.map((keyText, i) => (
              <TouchableWithoutFeedback key={i} onPress={() => this.props.handleChange(keyText)}>
                <KeyButton>
                  {keyText === 'X' ? (
                    <Icon name="ios-backspace-outline" size={32} />
                  ) : (
                    <KeyText>{keyText}</KeyText>
                  )}
                </KeyButton>
              </TouchableWithoutFeedback>
            ))}
          </KeyBoardRow>
        ))}
      </KeyBoardContainer>
    )
  }
}

const KeyBoardContainer = styled.View`flex: 1;`

const KeyBoardRow = styled.View`
  flex: 1;
  flex-direction: row;
`

const KeyButton = styled.View`
  flex: 1;
  border-left-width: 1;
  border-bottom-width: 1;
  border-color: rgba(0, 0, 0, 0.27);
  justify-content: center;
  align-items: center;
`

const KeyText = styled.Text`font-size: ${LARGE_FONT};`
