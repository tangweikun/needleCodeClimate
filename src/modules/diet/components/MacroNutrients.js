import styled from 'styled-components/native'
import React from 'react'
import { RGB102, REGULAR_FONT } from '../../../constants'

export const MacroNutrients = ({ numberColor, textColor, data }) => (
  <RootView>
    {data.map(item => (
      <Detail
        value={item.value}
        name={item.name}
        key={item.key}
        numberColor={numberColor}
        textColor={textColor}
      />
    ))}
  </RootView>
)

const Detail = ({ name, value, numberColor, textColor }) => (
  <DetailView>
    <NumberContent color={numberColor}>{Math.round(value)}</NumberContent>
    <TextContent color={textColor}>{name}</TextContent>
  </DetailView>
)

const DetailView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 6;
`

const TextContent = styled.Text`color: ${p => p.color || RGB102};`

const NumberContent = styled.Text`
  color: ${p => p.color || RGB102};
  font-size: ${REGULAR_FONT};
`

const RootView = styled.View`
  flex-direction: row;
  justify-content: center;
`
