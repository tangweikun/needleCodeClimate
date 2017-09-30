import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'

import {
  LIGHT_THEME_BACKGROUND_COLOR,
  DigestiveStateLabel,
  LIGHT_THEME_BUTTON_COLOR,
  DARK_THEME_BUTTON_TEXT_COLOR,
  LARGE_FONT,
} from '../constants'

export const DigestiveButton = ({ title, onPress, borderRightWidth = 0 }) => (
  <View style={{ flex: 1, borderRightWidth, borderColor: LIGHT_THEME_BUTTON_COLOR }}>
    <TouchButton onPress={onPress}>
      <ButtonView>
        <ButtonText>{title}</ButtonText>
      </ButtonView>
    </TouchButton>
  </View>
)

export const DigestiveStateButtons = ({ onPress }) => (
  <RootView>
    <RowView>
      <DigestiveButton
        title={DigestiveStateLabel.BEFORE_BREAKFAST}
        borderRightWidth={1}
        onPress={() => onPress('BEFORE_BREAKFAST')}
      />
      <DigestiveButton
        title={DigestiveStateLabel.AFTER_BREAKFAST}
        onPress={() => onPress('AFTER_BREAKFAST')}
      />
    </RowView>
    <RowView>
      <DigestiveButton
        title={DigestiveStateLabel.BEFORE_LUNCH}
        borderRightWidth={1}
        onPress={() => onPress('BEFORE_LUNCH')}
      />
      <DigestiveButton
        title={DigestiveStateLabel.AFTER_LUNCH}
        onPress={() => onPress('AFTER_LUNCH')}
      />
    </RowView>
    <RowView>
      <DigestiveButton
        title={DigestiveStateLabel.BEFORE_DINNER}
        borderRightWidth={1}
        onPress={() => onPress('BEFORE_DINNER')}
      />
      <DigestiveButton
        title={DigestiveStateLabel.AFTER_DINNER}
        onPress={() => onPress('AFTER_DINNER')}
      />
    </RowView>
    <RowView>
      <DigestiveButton
        title={DigestiveStateLabel.BEFORE_SLEEP}
        borderRightWidth={1}
        onPress={() => onPress('BEFORE_SLEEP')}
      />
      <DigestiveButton title={DigestiveStateLabel.MIDNIGHT} onPress={() => onPress('MIDNIGHT')} />
    </RowView>
  </RootView>
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
