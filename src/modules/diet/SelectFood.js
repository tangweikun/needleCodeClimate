import React from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import {
  FlatList,
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Image,
} from 'react-native'
import {
  RGB102,
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  LIGHT_THEME_BACKGROUND_COLOR,
  GRAY230,
  DARK_BLACK,
  REGULAR_FONT,
  DIET_TOKEN_ORANGE,
  SMALL_FONT,
  ScreenWidth,
} from '../../constants'
import { foods } from './constants'
import { MacroNutrients, Operation } from './components'

class _SelectFood extends React.Component {
  state = { modalVisible: false }

  changeModalState = () => this.setState(prevState => ({ modalVisible: !prevState.modalVisible }))

  calculate = selectedFoods => {
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

    selectedFoods.forEach(item => {
      macroNutrients = macroNutrients.map(x => ({
        ...x,
        value: x.value + item[x.key] * this.props.diet[item.key],
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
      value: x.value + result[x.key] * (this.props.diet[foo.key] || 1),
    }))

    return macroNutrients
  }

  render() {
    const selectedFoods = foods.filter(item => this.props.diet[item.key])

    const macroNutrients = this.calculate(selectedFoods)

    return (
      <View style={{ flex: 1 }}>
        <Body>
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
        </Body>
        {this.state.modalVisible ? (
          <ModalView
            navigation={this.props.navigation}
            changeModalState={this.changeModalState}
            data={selectedFoods}
            macroNutrients={macroNutrients}
            mealTime={this.props.navigation.state.params.mealTime}
            selectedFoods={selectedFoods}
            calculate2={this.calculate2}
          />
        ) : (
          <Footer>
            <Bottom>
              <Flex3>
                <TouchableWithoutFeedback
                  disabled={!selectedFoods.length}
                  onPress={() => this.changeModalState()}
                >
                  <Basket
                    source={require('../../assets/images/icon_basket.png')}
                    resizeMode="contain"
                  />
                </TouchableWithoutFeedback>
                <MacroNutrients numberColor="#fff" textColor="#fff" data={macroNutrients} />
              </Flex3>

              <TouchableWithoutFeedback
                disabled={!selectedFoods.length}
                onPress={() =>
                  this.props.navigation.navigate('SquaringUp', {
                    macroNutrients,
                    mealTime: this.props.navigation.state.params.mealTime,
                    selectedFoods,
                  })}
              >
                <Flex1>
                  <Text style={{ fontSize: 18, color: '#fff' }}>选好了</Text>
                </Flex1>
              </TouchableWithoutFeedback>
            </Bottom>
          </Footer>
        )}
      </View>
    )
  }
}

const ModalView = ({
  navigation,
  changeModalState,
  data,
  macroNutrients,
  mealTime,
  selectedFoods,
  calculate2,
}) => (
  <Modal visible transparent animationType="fade">
    <View style={{ backgroundColor: 'rgba(4,4,15,0.4)', width: '100%', height: '100%' }}>
      <TouchableWithoutFeedback onPress={() => changeModalState()}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>
      <Footer>
        <Title>
          <RegularText color={RGB102}>已选食物</RegularText>
        </Title>
        <ScrollView style={{ maxHeight: 200, width: '100%' }}>
          <FlatList
            data={data}
            renderItem={({ item }) => <Row item={item} macroNutrients={calculate2(item)} />}
            ItemSeparatorComponent={() => <SeparatorLine />}
          />
        </ScrollView>

        <Bottom>
          <Flex3>
            <Basket source={require('../../assets/images/icon_basket.png')} resizeMode="contain" />
            <MacroNutrients numberColor="#fff" textColor="#fff" data={macroNutrients} />
          </Flex3>

          <TouchableWithoutFeedback
            onPress={() => {
              changeModalState()
              navigation.navigate('SquaringUp', { macroNutrients, mealTime, selectedFoods })
            }}
          >
            <Flex1>
              <Text style={{ fontSize: REGULAR_FONT, color: '#fff' }}>选好了</Text>
            </Flex1>
          </TouchableWithoutFeedback>
        </Bottom>
      </Footer>
    </View>
  </Modal>
)

const mapStateToProps = state => ({ diet: state.diet })

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

const Row = ({ item, macroNutrients }) => (
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
      <Operation foodKey={item.key} />
    </View>
  </RowContainer>
)

const RowWithImage = ({ item }) => (
  <RowContainer>
    <FoodImage source={item.avatar} />
    <Right>
      <RegularText>{item.name}</RegularText>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <MacroNutrients
          data={[
            {
              key: 'carbohydrate',
              name: '碳水',
              value: item.carbohydrate,
            },
            {
              key: 'protein',
              name: '蛋白',
              value: item.protein,
            },
            {
              key: 'fat',
              name: '油脂',
              value: item.fat,
            },
          ]}
          numberColor={DIET_TOKEN_ORANGE}
        />
        <Operation foodKey={item.key} />
      </View>
    </Right>
  </RowContainer>
)

const Basket = styled.Image`
  height: 64;
  width: 64;
  top: -10;
  margin-left: 16;
`

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
  position: absolute;
  bottom: 0;
  flex: 1;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const Bottom = styled.View`
  background-color: ${RGB102};
  height: 50;
  flex-direction: row;
  width: 100%;
  align-items: center;
`
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

const SeparatorLine = styled.View`
  height: 1;
  background-color: ${GRAY230};
`

const Body = styled.ScrollView`background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};`

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
