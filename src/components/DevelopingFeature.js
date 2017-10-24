import React from 'react'
import styled from 'styled-components/native'
import { LIGHT_GRAY, LIGHT_WHITE, REGULAR_FONT } from '../constants'

export const DevelopingFeature = () => (
  <Container>
    <Content>该功能正在加班开发中</Content>
    <Content>请耐心等待^_^</Content>
  </Container>
)

const Content = styled.Text`
  color: ${LIGHT_GRAY};
  font-size: ${REGULAR_FONT};
`
const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${LIGHT_WHITE};
`
