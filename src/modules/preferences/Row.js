import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Entypo'

export const RowWithValueAndDisclosureIndicator = ({ title, value, onPress }) => (
  <Row title={title} onPress={onPress}>
    <Value>{value}</Value>
    <Icon
      style={{ marginTop: 3, marginRight: 6 }}
      name="chevron-small-right"
      size={25}
      color="#bbb"
    />
  </Row>
)

export const RowWithIconAndDisclosureIndicator = ({ iconName, title, onPress }) => (
  <Container onPress={onPress}>
    <Image source={iconName} style={{}} />
    <Title style={{ marginLeft: 10 }}>{title}</Title>
    <Icon
      style={{ marginTop: 3, marginRight: 6 }}
      name="chevron-small-right"
      size={25}
      color="#bbb"
    />
  </Container>
)

export const RowWithValue = ({ title, value, onPress }) => (
  <Row title={title} onPress={onPress}>
    <Value>{value}</Value>
    <Icon style={{ marginTop: 3, marginRight: 15 }} />
  </Row>
)

export const RowWithDisclosureIndicator = ({ title, onPress }) => (
  <Row title={title} onPress={onPress}>
    <Icon
      style={{ marginTop: 3, marginRight: 6 }}
      name="chevron-small-right"
      size={25}
      color="#bbb"
    />
  </Row>
)

export const Row = ({ title, onPress, children }) => (
  <Container onPress={onPress}>
    <Title>{title}</Title>
    {children}
  </Container>
)

const Container = styled.TouchableOpacity`
  background-color: white;
  padding-left: 15;
  height: 44;
  flex-direction: row;
  align-items: center;
`

const Title = styled.Text`
  color: black;
  font-size: 17;
  margin-right: auto;
`

const Value = styled.Text`
  color: gray;
  font-size: 17;
  margin-right: 0;
`
