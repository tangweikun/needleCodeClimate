import React from 'react'
import styled from 'styled-components/native'

import {
  LIGHT_THEME_BUTTON_TEXT_COLOR,
  DARK_THEME_BUTTON_TEXT_COLOR,
  REGULAR_FONT,
  LIGHT_THEME_BACKGROUND_COLOR,
  DARK_THEME_BACKGROUND_COLOR,
} from '../constants'

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
