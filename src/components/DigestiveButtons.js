import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'

import {
  LIGHT_THEME_BACKGROUND_COLOR,
  DigestiveStatePairLabel,
  LIGHT_THEME_BUTTON_COLOR,
  DARK_THEME_BUTTON_TEXT_COLOR,
  LARGE_FONT,
} from '../constants'

export const DigestiveStateButtons = ({ onPress }) => (
  <RootView>
    {DigestiveStatePairLabel.map((item, i) => (
      <RowView key={`digestiveState-${i}`}>
        {Object.entries(item).map(([key, value], index) => (
          <DigestiveButton
            key={key}
            title={value}
            borderRightWidth={1 - index}
            onPress={() => onPress(key)}
          />
        ))}
      </RowView>
    ))}
  </RootView>
)

const DigestiveButton = ({ title, onPress, borderRightWidth = 0 }) => (
  <View style={{ flex: 1, borderRightWidth, borderColor: LIGHT_THEME_BUTTON_COLOR }}>
    <TouchButton onPress={onPress}>
      <ButtonView>
        <ButtonText>{title}</ButtonText>
      </ButtonView>
    </TouchButton>
  </View>
)

const RootView = styled.View`
  flex: 2;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`

const RowView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1;
  border-color: ${LIGHT_THEME_BUTTON_COLOR};
`

const TouchButton = styled.TouchableWithoutFeedback``
const ButtonView = styled.View`
  flex: 1;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
  justify-content: center;
`
const ButtonText = styled.Text`
  text-align: center;
  font-size: ${LARGE_FONT};
  color: ${DARK_THEME_BUTTON_TEXT_COLOR};
`
