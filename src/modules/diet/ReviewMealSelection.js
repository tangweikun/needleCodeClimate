import React from 'react'
import styled from 'styled-components/native'
import { FlatList, View, Text, TouchableOpacity, Alert } from 'react-native'
import { withApollo, graphql } from 'react-apollo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import {
  RGB102,
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  LIGHT_THEME_BACKGROUND_COLOR,
  GRAY230,
  DIET_TOKEN_ORANGE,
} from '../../constants'
import { saveMealsMutation, mealQuery } from '../../graphql'
import { foods } from './constants'
import { MacroNutrients } from './components'
import { resetDiet } from './action'

@withApollo
class _ReviewMealSelection extends React.Component {
  saveMeals = async () => {
    await this.props.mutate({
      variables: {
        mealTime: this.props.navigation.state.params.mealTime,
        patientId: this.props.patientId,
        food: Object.entries(this.props.foodBasket).map(([key, value]) => ({
          key,
          portionSize: value,
        })),
      },
    })

    Alert.alert('提示!', '成功完成代币结算.')
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'First' })],
    })
    this.props.navigation.dispatch(resetAction)
    this.props.resetDiet()
  }

  calculate2 = foo => {
    console.log('calculate2-selectFood')
    const result = foods.find(({ key }) => key === foo.key)
    return {
      carbohydrate: result.carbohydrate * (this.props.foodBasket[foo.key] || 1),
      protein: result.protein * (this.props.foodBasket[foo.key] || 1),
      fat: result.fat * (this.props.foodBasket[foo.key] || 1),
    }
  }

  foodSum = () =>
    Object.values(this.props.foodBasket).length &&
    Object.values(this.props.foodBasket).reduce((x, a) => x + a)
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Body>
          <FlatList
            data={this.props.navigation.state.params.selectedFoods}
            renderItem={({ item }) => (
              <Row
                item={item}
                macroNutrients={this.calculate2(item)}
                portionSize={this.props.foodBasket[item.key]}
              />
            )}
            ItemSeparatorComponent={() => <SeparatorLine />}
          />
          <SeparatorLine />
          <RowContainer2>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 4,
              }}
            >
              <Text style={{ color: RGB102 }}>{`共${this.foodSum()}份食物,小计:`}</Text>
            </View>
            <Right>
              <MacroNutrients data={this.props.navigation.state.params.macroNutrients} />
            </Right>
          </RowContainer2>
        </Body>

        <Footer>
          <Flex3>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 18 }}>
              <MacroNutrients
                data={this.props.navigation.state.params.macroNutrients}
                numberColor="#fff"
                textColor="#fff"
              />
            </View>
          </Flex3>

          <TouchableOpacity onPress={this.saveMeals}>
            <Flex1>
              <Text style={{ fontSize: 18, color: '#fff' }}>去结算</Text>
            </Flex1>
          </TouchableOpacity>
        </Footer>
      </View>
    )
  }
}

const ReviewMealSelectionWithSave = graphql(saveMealsMutation, {
  options: props => ({
    refetchQueries: [
      {
        query: mealQuery,
        variables: {
          patientId: props.patientId,
        },
      },
    ],
  }),
})(_ReviewMealSelection)

const mapStateToProps = state => ({
  patientId: state.appData.patientId,
  foodBasket: state.foodBasket,
})

const mapDispatchToProps = dispatch => ({
  resetDiet: () => dispatch(resetDiet()),
})

export const ReviewMealSelection = connect(mapStateToProps, mapDispatchToProps)(
  ReviewMealSelectionWithSave,
)

const Row = ({ item, macroNutrients, portionSize }) => (
  <RowContainer>
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ color: RGB102 }}>{`${item.name} X ${portionSize}`}</Text>
    </View>
    <MacroNutrients data={macroNutrients} />
  </RowContainer>
)

const Flex3 = styled.View`
  flex: 3;
  flex-direction: row;
`

const Flex1 = styled.View`
  flex: 1;
  background-color: ${DIET_TOKEN_ORANGE};
  height: 50;
  justify-content: center;
  align-items: center;
`

const Footer = styled.View`
  background-color: ${RGB102};
  height: 50;
  position: absolute;
  bottom: 0;
  flex: 1;
  flex-direction: row;
  width: 100%;
  align-items: center;
`

const Right = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
`

const SeparatorLine = styled.View`
  height: 1;
  background-color: ${GRAY230};
`

const Body = styled.ScrollView`background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};`

const RowContainer = styled.View`
  height: 44;
  padding-left: 16;
  padding-right: 16;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`

const RowContainer2 = styled.View`
  height: 64;
  padding-left: 16;
  padding-right: 16;
  flex-direction: row;
  align-items: center;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`
