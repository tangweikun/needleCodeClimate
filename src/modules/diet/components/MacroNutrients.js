import styled from 'styled-components/native'
import React from 'react'
import { View } from 'react-native'
import { RGB102, MINI_FONT } from '../../../constants'

const i18 = {
  carbohydrate: '碳水',
  protein: '蛋白质',
  fat: '油脂',
}

export const MacroNutrients = ({ numberColor, textColor, data }) => (
  <RootView>
    {Object.entries(data).map(([key, value]) => (
      <Detail value={value} name={key} key={key} numberColor={numberColor} textColor={textColor} />
    ))}
  </RootView>
)

const Detail = ({ name, value, numberColor, textColor }) => (
  <DetailView>
    <NumberView>
      <NumberContent color={numberColor}>{Math.round(value)}</NumberContent>
    </NumberView>
    <View style={{ top: 2 }}>
      <TextContent color={textColor}>{i18[name]}</TextContent>
    </View>
  </DetailView>
)

const DetailView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 6;
`

const NumberView = styled.View`margin-right: 4;`

const TextContent = styled.Text`
  color: ${p => p.color || RGB102};
  text-align-vertical: bottom;
  font-size: ${MINI_FONT};
`

const NumberContent = styled.Text`
  color: ${p => p.color || RGB102};
  font-size: 18;
`

const RootView = styled.View`
  flex-direction: row;
  justify-content: center;
`
