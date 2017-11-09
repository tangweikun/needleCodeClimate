import React from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'

import { toggleDevMode, setPatient } from '../ducks/actions'
import { RowWithValue } from '../components'

import { LIGHT_THEME_ALT_BACKGROUND_COLOR, GRAY230 } from '../constants'

const getBMI = (weight, height) =>
  (weight && height ? (weight / Math.pow(height / 100, 2)).toFixed(1) : '- -')

class _BodyFile extends React.Component {
  render() {
    const { height, weight, targetWeight, diabetesType, startOfIllness } = this.props.appData

    return (
      <RootView>
        <MarginTopView>
          <FlatList
            data={[
              {
                key: '身高',
                onPress: () => console.log('update gender'),
                value: height ? `${height} CM` : '- -',
              },
              {
                key: '体重',
                onPress: () => console.log('update birthday'),
                value: weight ? `${weight} KG` : '- -',
              },
              {
                key: 'BMI',
                onPress: () => console.log('update gender'),
                value: getBMI(weight, height),
              },
            ]}
            renderItem={({ item }) => (
              <RowWithValue title={item.key} value={item.value} onPress={() => item.onPress()} />
            )}
            ItemSeparatorComponent={() => <SeparatorLine />}
          />
        </MarginTopView>

        <MarginTopView>
          <RowWithValue
            title="目标体重"
            value={targetWeight || '- -'}
            onPress={() => console.log('show alert')}
          />
        </MarginTopView>

        <MarginTopView>
          <FlatList
            data={[
              {
                key: '糖尿病类型',
                onPress: () => console.log('update gender'),
                value: diabetesType || '- -',
              },
              {
                key: '病程',
                onPress: () => console.log('update birthday'),
                value: startOfIllness
                  ? `${startOfIllness.replace('/', '年').replace(/\d$/, '$&月')}-至今`
                  : '- -',
              },
            ]}
            renderItem={({ item }) => (
              <RowWithValue title={item.key} value={item.value} onPress={() => item.onPress()} />
            )}
            ItemSeparatorComponent={() => <SeparatorLine />}
          />
        </MarginTopView>
      </RootView>
    )
  }
}

const mapStateToProps = state => ({ appData: state.appData })

const mapDispatchToProps = dispatch => ({
  toggleDevMode: () => dispatch(toggleDevMode()),
  setPatient: g => dispatch(setPatient(g)),
})

export const BodyFile = connect(mapStateToProps, mapDispatchToProps)(_BodyFile)

const RootView = styled.ScrollView`
  background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};
  flex: 1;
`

const MarginTopView = styled.View`margin-top: 10px;`

const SeparatorLine = styled.View`
  height: 1;
  background-color: ${GRAY230};
`
