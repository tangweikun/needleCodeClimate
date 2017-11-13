import styled from 'styled-components/native'
import React from 'react'
import { connect } from 'react-redux'
import { Image, TouchableWithoutFeedback } from 'react-native'
import { RGB102 } from '../../../constants'
import { addFood, subtractFood } from '../action'

const widthAndHeight = {
  height: 20,
  width: 20,
}

export class _AddToBasket extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { foodBasket, foodKey } = this.props
    if (foodBasket[foodKey] === nextProps.foodBasket[nextProps.foodKey]) {
      return false
    }
    return true
  }

  render() {
    const { foodKey, foodBasket } = this.props
    const portionSize = foodBasket[foodKey]
    return (
      <OperationView>
        {portionSize > 0 && (
          <Root>
            <TouchableWithoutFeedback onPress={() => this.props.subtractFood(foodKey)}>
              <SubtractButton>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/icon_delete.png')}
                  style={{ ...widthAndHeight, marginRight: 8 }}
                />
              </SubtractButton>
            </TouchableWithoutFeedback>
          </Root>
        )}
        {portionSize > 0 && (
          <Root>
            <PortionCount>
              <PortionCounter>{portionSize}</PortionCounter>
            </PortionCount>
          </Root>
        )}

        <TouchableWithoutFeedback onPress={() => this.props.addFood(foodKey)}>
          <AddButton>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/icon_add.png')}
              style={{ ...widthAndHeight, marginLeft: 8 }}
            />
          </AddButton>
        </TouchableWithoutFeedback>
      </OperationView>
    )
  }
}

const mapStateToProps = state => ({ foodBasket: state.foodBasket })

const mapDispatchToProps = dispatch => ({
  addFood: name => dispatch(addFood(name)),
  subtractFood: name => dispatch(subtractFood(name)),
})

export const AddToBasket = connect(mapStateToProps, mapDispatchToProps)(_AddToBasket)
const Root = styled.View``
const OperationView = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  width: 80;
  height: 40;
  flex: 1;
`
const AddButton = styled.View`
  justify-content: center;
  width: 30;
  height: 30;
`

const SubtractButton = styled.View`
  justify-content: center;
  align-items: flex-end;
  width: 30;
  height: 30;
`
const PortionCount = styled.View`
  align-items: center;
  width: 18;
`
const PortionCounter = styled.Text`
  color: ${RGB102};
  text-align: center;
`
