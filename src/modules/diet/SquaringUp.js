import React from 'react'
import styled from 'styled-components/native'
import { FlatList, View, Text, TouchableWithoutFeedback, Alert } from 'react-native'
import { withApollo, graphql } from 'react-apollo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import {
  RGB102,
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  LIGHT_THEME_BACKGROUND_COLOR,
  GRAY230,
  REGULAR_FONT,
  DIET_TOKEN_ORANGE,
} from '../../constants'
import { saveMealsMutation, mealQuery } from '../../graphql'
import { foods } from './constants'
import { MacroNutrients } from './components'
import { resetDiet } from './action'

@withApollo
class _SquaringUp extends React.Component {
  saveMeals = async () => {
    await this.props.mutate({
      variables: {
        mealTime: this.props.navigation.state.params.mealTime,
        patientId: this.props.patientId,
        food: Object.entries(this.props.diet).map(([key, value]) => ({
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
      value: x.value + result[x.key] * (this.props.diet[foo.key] || 1),
    }))

    return macroNutrients
  }

  foodSum = () =>
    Object.values(this.props.diet).length && Object.values(this.props.diet).reduce((x, a) => x + a)
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
                portionSize={this.props.diet[item.key]}
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
              <Text style={{ color: RGB102 }}>{`共${this.foodSum()}份食物`}</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: RGB102 }}>小计:</Text>
              </View>
            </View>
            <Right>
              {this.props.navigation.state.params.macroNutrients.map(item => (
                <Detail value={item.value} name={item.name} key={item.key} />
              ))}
            </Right>
          </RowContainer2>

          {/* <RowContainer3>
            <Center>
              <View>
                <Text style={{ fontSize: SMALL_FONT, color: darkBlack }}>推荐方案</Text>
              </View>
              <View>
                <Text style={{ fontSize: MINI_FONT, color: DIET_TOKEN_ORANGE }}>根据三餐配比计算得出</Text>
              </View>
            </Center>
            <Right>
              <Detail value={12} color={RGB102} name="碳水" />
              <Detail value={3} color={RGB102} name="蛋白" />
              <Detail value={5} color={RGB102} name="油脂" />
            </Right>
          </RowContainer3> */}
        </Body>

        <Footer>
          <Flex3>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 18 }}>
              {this.props.navigation.state.params.macroNutrients.map(item => (
                <Detail value={item.value} name={item.name} key={item.key} color="#fff" />
              ))}
            </View>
          </Flex3>

          <TouchableWithoutFeedback onPress={this.saveMeals}>
            <Flex1>
              <Text style={{ fontSize: REGULAR_FONT, color: '#fff' }}>去结算</Text>
            </Flex1>
          </TouchableWithoutFeedback>
        </Footer>
      </View>
    )
  }
}

const SquaringUpWithSave = graphql(saveMealsMutation, {
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
})(_SquaringUp)

const mapStateToProps = state => ({ patientId: state.appData.patientId, diet: state.diet })

const mapDispatchToProps = dispatch => ({
  resetDiet: () => dispatch(resetDiet()),
})

export const SquaringUp = connect(mapStateToProps, mapDispatchToProps)(SquaringUpWithSave)

const Row = ({ item, macroNutrients, portionSize }) => (
  <RowContainer>
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ color: RGB102 }}>{`${item.name} X ${portionSize}`}</Text>
    </View>
    <MacroNutrients data={macroNutrients} />
  </RowContainer>
)

const Detail = ({ name, value, color }) => (
  <DetailView>
    <NumberContent color={color}>{Math.round(value)}</NumberContent>
    <TextContent color={color}>{name}</TextContent>
  </DetailView>
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
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`

const DetailView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 6;
`

const NumberContent = styled.Text`
  color: ${p => p.color || DIET_TOKEN_ORANGE};
  font-size: ${REGULAR_FONT};
`

const TextContent = styled.Text`color: ${p => p.color || RGB102};`

const SeparatorLine = styled.View`
  height: 1;
  background-color: ${GRAY230};
`

const Body = styled.ScrollView`background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};`

const RowContainer = styled.View`
  height: 64;
  padding-left: 16;
  padding-right: 16;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`

const RowContainer2 = styled.View`
  height: 44;
  padding-left: 16;
  padding-right: 16;
  flex-direction: row;
  align-items: center;
  background-color: ${LIGHT_THEME_BACKGROUND_COLOR};
`
