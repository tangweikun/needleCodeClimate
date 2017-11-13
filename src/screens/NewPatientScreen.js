import * as React from 'react'
import { AsyncStorage, Alert } from 'react-native'
import styled from 'styled-components/native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { withApollo } from 'react-apollo'
import { GRAY230 } from '../constants'
import { RowWithValue, Button } from '../components'
import { setPatient } from '../ducks/actions'
import {
  ShowPicker,
  ageRange,
  heightRange,
  weightRange,
  parseBirthDate,
  displayBirthDate,
  parseGender,
  displayGender,
  genders,
  DEFAULT_HEIGHT,
  DEFAULT_WEIGHT,
} from '../utils/pickerContent'
import { updatePatientDemographicsMutation } from '../graphql'
@withApollo
export class _NewPatientScreen extends React.Component {
  static navigationOptions = () => ({
    title: '个人信息',
  })
  state = {
    birthday: '',
    height: '',
    weight: '',
    gender: '',
  }
  submitPicker = (type, value) => {
    this.setState({ [type]: value })
  }
  submitForm = async () => {
    if (!this.state.birthday || !this.state.height || !this.state.weight || !this.state.gender) {
      Alert.alert('表单未完成，请填写所有信息')
      return
    }
    const original = this.props.navigation.state.params.userInfo
    const userInfo = { ...original, ...this.state }
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'First' })],
    })
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    this.props.navigation.dispatch(resetAction)
    this.props.setPatient(userInfo)
    this.props.client
      .mutate({
        mutation: updatePatientDemographicsMutation,
        variables: { mobile: userInfo.mobile, ...this.state },
      })
      .catch(e => console.log('error', e))
  }
  height = () => ShowPicker('height', heightRange(), '身高(CM)', [DEFAULT_HEIGHT], this.submitPicker)
  weight = () => ShowPicker('weight', weightRange(), '体重(KG)', [DEFAULT_WEIGHT], this.submitPicker)
  gender = () => ShowPicker('gender', genders, '性别', [], this.submitPicker, parseGender)
  birthday = () =>
    ShowPicker('birthday', ageRange(), '出生日期', [165], this.submitPicker, parseBirthDate)
  render() {
    return (
      <Root>
        <Root>
          <ListForm
            data={[
              {
                key: '身高',
                onPress: () => this.height(),
                value: this.state.height ? `${this.state.height} CM` : '请选择',
              },
              {
                key: '体重',
                onPress: () => this.weight(),
                value: this.state.weight ? `${this.state.weight} KG` : '请选择',
              },
              {
                key: '生日',
                onPress: () => this.birthday(),
                value: this.state.birthday ? `${displayBirthDate(this.state.birthday)}` : '请选择',
              },
              {
                key: '性别',
                onPress: () => this.gender(),
                value: this.state.gender ? `${displayGender(this.state.gender)}` : '请选择',
              },
            ]}
            renderItem={({ item }) => (
              <RowWithValue title={item.key} value={item.value} onPress={() => item.onPress()} />
            )}
            ItemSeparatorComponent={() => <SeparatorLine />}
          />
        </Root>
        <Root>
          <Button dark title="下一步" onPress={() => this.submitForm()} />
        </Root>
      </Root>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({ setPatient: g => dispatch(setPatient(g)) })

export const NewPatientScreen = connect(mapStateToProps, mapDispatchToProps)(_NewPatientScreen)

const Root = styled.View`flex: 1;`

const SeparatorLine = styled.View`
  height: 1;
  background-color: ${GRAY230};
`
const ListForm = styled.FlatList`padding-top: 5;`
