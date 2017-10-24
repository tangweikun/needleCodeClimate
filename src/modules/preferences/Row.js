import React from 'react'
import { Image, View, Text } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Entypo'

import { GRAY85, SMALL_FONT, GRAY206, GRAY136, MINI_FONT } from '../../constants'

export const RowWithValueAndDisclosureIndicator = ({ title, value, onPress }) => (
  <Row title={title} onPress={onPress}>
    <Value>{value}</Value>
    <ChevronRightIcon />
  </Row>
)

export const RowWithRightIconAndDisclosureIndicator = ({ title, image, onPress }) => (
  <Row title={title} onPress={onPress} height={110}>
    <Image source={image} style={{ height: 60, width: 60, borderRadius: 30 }} />
    <ChevronRightIcon />
  </Row>
)

export const RowWithIconAndDisclosureIndicator = ({ iconName, title, onPress }) => (
  <Container onPress={onPress}>
    <Image source={iconName} style={{}} />
    <Title style={{ marginLeft: 10 }}>{title}</Title>
    <ChevronRightIcon />
  </Container>
)

export const RowWithValue = ({ title, value, onPress, color }) => (
  <Row title={title} onPress={onPress}>
    <Value color={color}>{value}</Value>
  </Row>
)

export const RowWithDisclosureIndicator = ({ title, onPress }) => (
  <Row title={title} onPress={onPress}>
    <ChevronRightIcon />
  </Row>
)

export const Row = ({ title, onPress, children, height }) => (
  <Container onPress={onPress} height={height}>
    <Title>{title}</Title>
    {children}
  </Container>
)

export const RowWithIcons = ({ title, icons }) => (
  <View>
    <Row title={title} />
    <IconContainer>
      {icons.map(item => (
        <IconWrapper key={item.text} onPress={item.onPress}>
          <ImageView source={item.icon} />
          <Text style={{ fontSize: MINI_FONT }}>{item.text}</Text>
        </IconWrapper>
      ))}
    </IconContainer>
  </View>
)

const ChevronRightIcon = () => (
  <Icon style={{ marginRight: -7 }} name="chevron-small-right" size={25} color={GRAY206} />
)

const ImageView = styled.Image`
  width: 36;
  height: 32;
  margin-bottom: 4px;
  resize-mode: contain;
`

const IconContainer = styled.View`
  height: 70;
  background-color: white;
  flex-direction: row;
  justify-content: space-around;
`

const IconWrapper = styled.TouchableOpacity`
  justify-content: center;
  width: 66;
  align-items: center;
`

const Container = styled.TouchableOpacity`
  background-color: white;
  padding-left: 16;
  padding-right: 16;
  height: ${({ height }) => height || 44};
  flex-direction: row;
  align-items: center;
`

const Title = styled.Text`
  color: ${GRAY85};
  font-size: ${SMALL_FONT};
  margin-right: auto;
`

const Value = styled.Text`
  color: ${({ color }) => color || GRAY136};
  font-size: ${SMALL_FONT};
  margin-right: 0;
`
