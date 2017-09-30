import React from 'react'
import styled from 'styled-components/native'
import { LIGHT_THEME_BACKGROUND_COLOR } from '../../../constants'

export const MeasureError = () => (
  <RootView>
    <Whatever>尝试先拔出血糖仪，再重新插入...</Whatever>
  </RootView>
)

const RootView = styled.View`
  flex: 1;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
  justify-content: center;
`

const Whatever = styled.Text`text-align: center;`
