import React from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { FlatList, View, TouchableWithoutFeedback, Modal, Image } from 'react-native'
import {
  RGB102,
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  GRAY230,
  DARK_BLACK,
  SMALL_FONT,
  ScreenWidth,
} from '../../constants'
import { foods } from './constants'
import { Row, SummaryBar, RowWithImage } from './components'
import { calculateSumOfDietToken, getMacrosFromStore } from './utils/calculateSumOfDietToken'

class _SelectFood extends React.Component {
  state = { modalVisible: false }

  changeModalState = () => this.setState(prevState => ({ modalVisible: !prevState.modalVisible }))

  getOneItemsMacros = foo => getMacrosFromStore(foo, this.props.foodBasket)

  render() {
    const foodInBasketWithData = foods.filter(item => this.props.foodBasket[item.key])

    const macroNutrients = calculateSumOfDietToken(foodInBasketWithData, this.props.foodBasket)

    return (
      <Root>
        <AllFoodList>
          <FlatList
            data={foods}
            renderItem={({ item }) => <RowWithImage item={item} />}
            ItemSeparatorComponent={() => <SeparatorLine />}
          />

          <View style={{ marginBottom: 40 }}>
            <Image
              style={{ width: ScreenWidth, height: ScreenWidth / 2 }}
              resizeMode="contain"
              source={require('../../assets/images/sponsor.png')}
            />
          </View>
        </AllFoodList>
        {this.state.modalVisible ? (
          <ModalView
            navigation={this.props.navigation}
            changeModalState={this.changeModalState}
            macroNutrients={macroNutrients}
            mealTime={this.props.navigation.state.params.mealTime}
            foodInBasketWithData={foodInBasketWithData}
            getOneItemsMacros={this.getOneItemsMacros}
          />
        ) : (
          <Footer>
            <SummaryBar
              navigation={this.props.navigation}
              changeModalState={this.changeModalState}
              macroNutrients={macroNutrients}
              mealTime={this.props.navigation.state.params.mealTime}
              foodInBasketWithData={foodInBasketWithData}
            />
          </Footer>
        )}
      </Root>
    )
  }
}

const ModalView = ({
  navigation,
  changeModalState,
  macroNutrients,
  mealTime,
  foodInBasketWithData,
  getOneItemsMacros,
}) => (
  <Modal visible transparent animationType="fade" onRequestClose={() => changeModalState()}>
    <FullScreenModalView>
      <TouchableWithoutFeedback onPress={() => changeModalState()}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>
      <Footer>
        <Title>
          <RegularText color={RGB102}>已选食物</RegularText>
        </Title>
        <ChosenItems>
          <FlatList
            data={foodInBasketWithData}
            renderItem={({ item }) => <Row item={item} macroNutrients={getOneItemsMacros(item)} />}
            ItemSeparatorComponent={() => <SeparatorLine />}
          />
        </ChosenItems>
        <SummaryBar
          navigation={navigation}
          changeModalState={changeModalState}
          macroNutrients={macroNutrients}
          mealTime={mealTime}
          foodInBasketWithData={foodInBasketWithData}
          shouldChangeModalState
        />
      </Footer>
    </FullScreenModalView>
  </Modal>
)

const mapStateToProps = state => ({ foodBasket: state.foodBasket })

const mapDispatchToProps = () => ({})

export const SelectFood = connect(mapStateToProps, mapDispatchToProps)(_SelectFood)

const Title = styled.View`
  align-items: flex-start;
  justify-content: center;
  padding-left: 16;
  background-color: rgb(230, 230, 230);
  height: 44;
  width: 100%;
`
const ChosenItems = styled.ScrollView`
  max-height: 200;
  width: 100%;
`
const FullScreenModalView = styled.View`
  background-color: rgba(4, 4, 15, 0.4);
  height: 100%;
  width: 100%;
`

const Footer = styled.View`
  position: absolute;
  bottom: 0;
  flex: 1;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const SeparatorLine = styled.View`
  height: 1;
  background-color: ${GRAY230};
`

const AllFoodList = styled.ScrollView`background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};`

const RegularText = styled.Text`
  font-size: ${SMALL_FONT};
  color: ${p => p.color || DARK_BLACK};
`

const Root = styled.View`flex: 1;`
