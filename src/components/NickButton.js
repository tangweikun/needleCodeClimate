import React from 'react'
import styled from 'styled-components/native'
import { Image } from 'react-native'

import {
  LIGHT_THEME_BUTTON_TEXT_COLOR,
  LIGHT_THEME_BUTTON_COLOR,
  DARK_THEME_BUTTON_TEXT_COLOR,
  DARK_THEME_BUTTON_COLOR,
  SMALL_FONT,
  REGULAR_FONT,
  LARGE_FONT,
  LIGHT_THEME_BACKGROUND_COLOR,
  DARK_THEME_BACKGROUND_COLOR,
} from '../constants'

export const NickButton = ({
  title,
  onPress,
  dark,
  large,
  small,
  children,
  withoutMargin,
  withIcon,
  icon,
}) => (
  <TouchButton onPress={onPress}>
    <ButtonView dark={dark} large={large} small={small} withoutMargin={withoutMargin}>
      {withIcon && <Image source={icon} style={{ width: 22, height: 22, marginRight: 10 }} />}
      <ButtonText dark={dark} large={large} small={small}>
        {title}
        {children}
      </ButtonText>
    </ButtonView>
  </TouchButton>
)

export const Button = ({
  title,
  onPress,
  dark,
  color,
  icon,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
}) => (
  <TouchButton onPress={onPress}>
    <Container
      dark={dark}
      color={color}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      {!!icon && <Icon source={icon} resizeMode="contain" />}
      <Content dark={dark} color={color}>
        {title}
      </Content>
    </Container>
  </TouchButton>
)

const Icon = styled.Image`
  width: 24;
  height: 24;
  margin-right: 10px;
`

const Container = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border-width: 1;
  border-radius: 22;
  height: 44;
  background-color: ${p =>
    (p.dark ? p.color || DARK_THEME_BACKGROUND_COLOR : LIGHT_THEME_BACKGROUND_COLOR)};
  border-color: ${p => p.color || DARK_THEME_BACKGROUND_COLOR};
  margin-left: ${p => p.marginLeft || '34px'};
  margin-right: ${p => p.marginRight || '34px'};
  margin-top: ${p => p.marginTop || '10px'};
  margin-bottom: ${p => p.marginBottom || '10px'};
`

const Content = styled.Text`
  text-align: center;
  font-size: ${REGULAR_FONT};
  color: ${p => (p.dark ? LIGHT_THEME_BUTTON_TEXT_COLOR : p.color || DARK_THEME_BUTTON_TEXT_COLOR)};
`

const TouchButton = styled.TouchableWithoutFeedback``
const ButtonView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
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
