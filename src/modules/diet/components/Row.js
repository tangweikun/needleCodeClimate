import React from 'react'
import styled from 'styled-components/native'
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
      <RowContainer>
        <Left>
          <LeftText numberOfLines={1}>{item.name}</LeftText>
        </Left>
        <Center>
          <MacroNutrients data={macroNutrients} />
        </Center>
        <Right>
          <AddToBasket foodKey={item.key} />
        </Right>
      </RowContainer>
    )
  }
}

const RowContainer = styled.View`
  height: 50;
  padding-left: 16;
  padding-right: 16;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`

const Left = styled.View`
  flex: 3;
  padding-right: 5;
`

const Center = styled.View`flex: 4;`

const Right = styled.View`
  flex: 2;
  justify-content: flex-end;
  align-items: flex-end;
`

const LeftText = styled.Text`font-size: ${SMALL_FONT};`
