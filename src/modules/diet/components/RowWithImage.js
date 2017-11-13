import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import {
  LIGHT_THEME_BACKGROUND_COLOR,
  DARK_BLACK,
  DIET_TOKEN_ORANGE,
  SMALL_FONT,
} from '../../../constants'
import { AddToBasket, MacroNutrients } from '../components'

export class RowWithImage extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { item } = this.props
    return (
      <RowContainer>
        <FoodImage source={item.avatar} />
        <Right>
          <RegularText>{item.name}</RegularText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MacroNutrients
              data={{ carbohydrate: item.carbohydrate, protein: item.protein, fat: item.fat }}
              numberColor={DIET_TOKEN_ORANGE}
            />
            <AddToBasket foodKey={item.key} />
          </View>
        </Right>
      </RowContainer>
    )
  }
}

const Right = styled.View`
  flex-direction: column;
  justify-content: space-between;
  height: 60;
  flex: 1;
`

const FoodImage = styled.Image`
  height: 60;
  width: 60;
  border-radius: 2;
  margin-right: 12;
`

const RowContainer = styled.View`
  height: ${p => p.height || 80};
  padding-left: 16;
  padding-right: 16;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`

const RegularText = styled.Text`
  font-size: ${SMALL_FONT};
  color: ${p => p.color || DARK_BLACK};
`
