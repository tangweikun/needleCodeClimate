import React from 'react'
import styled from 'styled-components/native'
import { Text, TouchableWithoutFeedback } from 'react-native'
import { RGB102, DIET_TOKEN_ORANGE } from '../../../constants'
import { MacroNutrients } from './MacroNutrients'

export const SummaryBar = ({
  navigation,
  changeModalState,
  macroNutrients,
  mealTime,
  foodInBasketWithData,
  shouldChangeModalState,
}) => (
  <RootView>
    <TouchableWithoutFeedback
      disabled={!foodInBasketWithData.length}
      onPress={() => changeModalState()}
    >
      <Left>
        <Basket source={require('../../../assets/images/icon_basket.png')} resizeMode="contain" />
        <MacroNutrients numberColor="#fff" textColor="#fff" data={macroNutrients} />
      </Left>
    </TouchableWithoutFeedback>

    <TouchableWithoutFeedback
      onPress={() => {
        if (shouldChangeModalState) changeModalState()
        navigation.navigate('ReviewMealSelection', {
          macroNutrients,
          mealTime,
          foodInBasketWithData,
        })
      }}
    >
      <Right>
        <Text style={{ fontSize: 18, color: '#fff' }}>选好了</Text>
      </Right>
    </TouchableWithoutFeedback>
  </RootView>
)

const Basket = styled.Image`
  height: 64;
  width: 64;
  top: -10;
  margin-left: 16;
`

const Left = styled.View`
  flex: 3;
  flex-direction: row;
`

const Right = styled.View`
  flex: 1;
  background-color: ${DIET_TOKEN_ORANGE};
  height: 50;
  justify-content: center;
  align-items: center;
`

const RootView = styled.View`
  background-color: ${RGB102};
  height: 50;
  flex-direction: row;
  width: 100%;
  align-items: center;
`
