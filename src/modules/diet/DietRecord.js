import React from 'react'
import { connect } from 'react-redux'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { withApollo, graphql } from 'react-apollo'
import styled from 'styled-components/native'
import { get } from 'lodash'
import { mealQuery } from '../../graphql'
import { InternetError } from '../../components'
import {
  PRIMARY_COLOR,
  PAGE_MARGIN,
  GRAY230,
  SMALL_FONT,
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  GRAY136,
} from '../../constants'
import { foods, MEAL_TIME } from './constants'
import { MacroNutrients } from './components'
import { getMacrosFromJSON } from './utils/calculateSumOfDietToken'

@withApollo
class _DietRecord extends React.Component {
  render() {
    const { data } = this.props

    if (data.error) return <InternetError error={JSON.stringify(data.error.message)} />
    if (data.loading) {
      return (
        <View>
          <ActivityIndicator animating size="large" color={PRIMARY_COLOR} />
        </View>
      )
    }

    return (
      <ScrollView style={{ backgroundColor: LIGHT_THEME_ALT_BACKGROUND_COLOR }}>
        {data.fetchDiets.map(oneDay => (
          <View key={Math.random()} style={{ backgroundColor: '#fff' }}>
            <DateRow date={oneDay._id} />
            {oneDay.items.map(meal => <OneMealOfFoods key={Math.random()} meal={meal} />)}
          </View>
        ))}
      </ScrollView>
    )
  }
}
const OneMealOfFoods = ({ meal }) => (
  <View>
    <MealTimeRow mealTime={MEAL_TIME[meal.mealTime]} />
    {meal.food.map(oneFoodItem => (
      <SumOfItemMacrosNutrients key={Math.random()}>
        <GreyText>
          {getFoodNameAndPortionCounter(oneFoodItem.key, oneFoodItem.portionSize)}
        </GreyText>
        <MacroNutrients data={getMacrosFromJSON([oneFoodItem])} />
      </SumOfItemMacrosNutrients>
    ))}
    <TotalMacroNutrientsPerDay oneMealsWorthOfFood={getMacrosFromJSON(meal.food)} />
  </View>
)
const getFoodNameAndPortionCounter = (key, portion) =>
  `${get(foods.find(y => y.key === key), 'name')} X ${portion}`

const TotalMacroNutrients = styled.View`
  flex-direction: row;
  padding-left: ${PAGE_MARGIN};
  padding-right: ${PAGE_MARGIN};
  justify-content: space-between;
  height: 40;
  align-items: center;
`
const TotalMacroNutrientsPerDay = ({ oneMealsWorthOfFood }) => (
  <TotalMacroNutrients>
    <Text style={{ color: GRAY136 }}>合计</Text>
    <MacroNutrients data={oneMealsWorthOfFood} />
  </TotalMacroNutrients>
)
const SumOfItemMacrosNutrients = styled.View`
  border-color: blue;
  flex-direction: row;
  padding-left: ${PAGE_MARGIN};
  padding-right: ${PAGE_MARGIN};
  justify-content: space-between;
  height: 32;
  align-items: center;
`
const GreyText = styled.Text`color: ${GRAY136};`

const DateRow = ({ date }) => (
  <DateView>
    <Text style={{ fontSize: SMALL_FONT }}>{date}</Text>
  </DateView>
)

const MealTimeRow = ({ mealTime }) => (
  <MealTimeView>
    <Text style={{ fontSize: SMALL_FONT }}>{mealTime}</Text>
  </MealTimeView>
)

const MealTimeView = styled.View`
  height: 44;
  padding-left: ${PAGE_MARGIN};
  justify-content: center;
  border-bottom-color: ${GRAY230};
  border-bottom-width: 1;
  margin-bottom: 4;
`

const DateView = styled.View`
  background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};
  height: 44;
  flex-direction: row;
  align-items: center;
  padding-left: ${PAGE_MARGIN};
  padding-right: ${PAGE_MARGIN};
`

const mapStateToProps = state => ({ patientId: state.appData.patientId })

const mapDispatchToProps = () => ({})

const DietRecordWithDate = graphql(mealQuery, {
  options: props => ({
    variables: { patientId: props.patientId },
  }),
})(_DietRecord)

export const DietRecord = connect(mapStateToProps, mapDispatchToProps)(DietRecordWithDate)
