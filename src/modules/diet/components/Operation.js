import styled from 'styled-components/native'
import React from 'react'
import { connect } from 'react-redux'
import { Text, Image, TouchableWithoutFeedback } from 'react-native'
import { GRAY102 } from '../../../constants'
import { addFood, subtractFood } from '../action'

const widthAndHeight = {
  height: 20,
  width: 20,
}

export class _Operation extends React.Component {
  render() {
    const { foodKey, diet } = this.props
    return (
      <OperationView>
        {this.props.diet[this.props.foodKey] > 0 && [
          <TouchableWithoutFeedback
            key="touchableWithFeedback"
            onPress={() => this.props.subtractFood(foodKey)}
          >
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/icon_delete.png')}
              style={{ ...widthAndHeight, marginRight: 8 }}
            />
          </TouchableWithoutFeedback>,
          <Text key="text" style={{ color: GRAY102 }}>
            {diet[foodKey]}
          </Text>,
        ]}

        <TouchableWithoutFeedback onPress={() => this.props.addFood(foodKey)}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/icon_add.png')}
            style={{ ...widthAndHeight, marginLeft: 8 }}
          />
        </TouchableWithoutFeedback>
      </OperationView>
    )
  }
}

const mapStateToProps = state => ({ diet: state.diet })

const mapDispatchToProps = dispatch => ({
  addFood: name => dispatch(addFood(name)),
  subtractFood: name => dispatch(subtractFood(name)),
})

export const Operation = connect(mapStateToProps, mapDispatchToProps)(_Operation)

const OperationView = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  width: 64;
`
