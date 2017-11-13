import React from 'react'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
import { LIGHT_THEME_BACKGROUND_COLOR, SMALL_FONT } from '../../../constants'
import { MacroNutrients, AddToBasket } from '../components'

export class Row extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { macroNutrients } = this.props
    if (
      nextProps.macroNutrients.carbohydrates === macroNutrients.carbohydrates &&
      nextProps.macroNutrients.protein === macroNutrients.protein &&
      nextProps.macroNutrients.fat === macroNutrients.fat
    ) {
      return false
    }

    return true
  }

  render() {
    const { item, macroNutrients } = this.props

    return (
      <RowContainer height={50}>
        <View style={{ flex: 3, paddingRight: 5 }}>
          <Text numberOfLines={1} style={{ fontSize: SMALL_FONT }}>
            {item.name}
          </Text>
        </View>
        <View style={{ flex: 4 }}>
          <MacroNutrients data={macroNutrients} />
        </View>
        <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <AddToBasket foodKey={item.key} />
        </View>
      </RowContainer>
    )
  }
}

const RowContainer = styled.View`
  height: ${p => p.height || 80};
  padding-left: 16;
  padding-right: 16;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`
