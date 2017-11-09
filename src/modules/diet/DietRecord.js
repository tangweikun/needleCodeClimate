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
  LIGHT_GRAY,
  PAGE_MARGIN,
  GRAY230,
  SMALL_FONT,
  GRAY136,
} from '../../constants'
import { foods, MEAL_TIME } from './constants'
import { MacroNutrients } from './components'

@withApollo
class _DietRecord extends React.Component {
  calculate = food => {
    let macroNutrients = [
      {
        key: 'carbohydrate',
        name: '碳水',
        value: 0,
      },
      {
        key: 'protein',
        name: '蛋白',
        value: 0,
      },
      {
        key: 'fat',
        name: '油脂',
        value: 0,
      },
    ]

    food.forEach(item => {
      const result = foods.find(({ key }) => key === item.key) || {}
      macroNutrients = macroNutrients.map(x => ({
        ...x,
        value: x.value + (result[x.key] || 0) * item.portionSize,
      }))
    })

    return macroNutrients
  }

  calculate2 = foo => {
    let macroNutrients = [
      {
        key: 'carbohydrate',
        name: '碳水',
        value: 0,
      },
      {
        key: 'protein',
        name: '蛋白',
        value: 0,
      },
      {
        key: 'fat',
        name: '油脂',
        value: 0,
      },
    ]

    const result = foods.find(({ key }) => key === foo.key)

    macroNutrients = macroNutrients.map(x => ({
      ...x,
      value: x.value + result[x.key] * foo.portionSize,
    }))

    return macroNutrients
  }

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
      <ScrollView>
        {data.fetchDiets.map(x => (
          <View key={Math.random()}>
            <DateRow date={x._id} />
            {x.items.map(k => (
              <View key={Math.random()}>
                <MealTimeRow mealTime={MEAL_TIME[k.mealTime]} />
                {k.food.map(f => (
                  <View
                    key={Math.random()}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 36,
                      justifyContent: 'space-between',
                      paddingLeft: PAGE_MARGIN,
                      paddingRight: PAGE_MARGIN,
                    }}
                  >
                    <Text style={{ color: GRAY136 }}>
                      {`${get(foods.find(y => y.key === f.key), 'name')} X ${f.portionSize}`}
                    </Text>
                    <MacroNutrients data={this.calculate2(f)} />
                  </View>
                ))}
                <View
                  style={{
                    flexDirection: 'row',
                    paddingLeft: PAGE_MARGIN,
                    paddingRight: PAGE_MARGIN,
                    justifyContent: 'space-between',
                    height: 40,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: GRAY136 }}>合计</Text>
                  <MacroNutrients data={this.calculate(k.food)} />
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    )
  }
}

const DateRow = ({ date }) => (
  <DateView>
    <Text>{date}</Text>
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
`

const DateView = styled.View`
  background-color: ${LIGHT_GRAY};
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
