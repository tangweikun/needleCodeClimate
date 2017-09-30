import React from 'react'
import styled from 'styled-components/native'

import {
  LIGHT_THEME_BUTTON_TEXT_COLOR,
  LIGHT_THEME_BUTTON_COLOR,
  DARK_THEME_BUTTON_TEXT_COLOR,
  DARK_THEME_BUTTON_COLOR,
  SMALL_FONT,
  REGULAR_FONT,
  LARGE_FONT,
} from '../constants'

export const NickButton = ({ title, onPress, dark, large, small, children, withoutMargin }) => (
  <TouchButton onPress={onPress}>
    <ButtonView dark={dark} large={large} small={small} withoutMargin={withoutMargin}>
      <ButtonText dark={dark} large={large} small={small}>
        {title}
        {children}
      </ButtonText>
    </ButtonView>
  </TouchButton>
)

const TouchButton = styled.TouchableWithoutFeedback``
const ButtonView = styled.View`
  justify-content: center;
  background-color: ${p => (p.dark ? LIGHT_THEME_BUTTON_COLOR : DARK_THEME_BUTTON_COLOR)};
  border-color: ${LIGHT_THEME_BUTTON_COLOR};
  border-width: 1;
  border-radius: 3;
  padding: 10px;
  margin: ${p => (p.withoutMargin ? 0 : '10px 50px')};
  shadow-radius: 6;
  elevation: 10;
`
const ButtonText = styled.Text`
  text-align: center;
  font-size: ${p => fontSize(p.large, p.small)};
  color: ${p => (p.dark ? LIGHT_THEME_BUTTON_TEXT_COLOR : DARK_THEME_BUTTON_TEXT_COLOR)};
`
const fontSize = (large, small) => {
  if (large) return LARGE_FONT
  if (small) return SMALL_FONT
  return REGULAR_FONT
}
