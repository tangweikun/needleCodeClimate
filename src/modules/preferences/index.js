import React from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { toggleDevMode, setPatient } from '../../ducks/actions'
import { RowWithDisclosureIndicator, RowWithIcons } from '../../components'

import {
  DARK_BLACK,
  defaultUserAvatar,
  LIGHT_THEME_ALT_BACKGROUND_COLOR,
  REGULAR_FONT,
  GRAY230,
  GRAY102,
} from '../../constants'

class _Preferences extends React.Component {
  render() {
    return (
      <RootView>
        <TopView onPress={() => this.props.navigation.navigate('AboutMe')}>
          <ImageView
            source={{
              uri: this.props.appData.avatar || defaultUserAvatar,
            }}
          />
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              height: 60,
              flex: 1,
            }}
          >
            <View style={{ justifyContent: 'flex-start', flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: REGULAR_FONT, color: DARK_BLACK }}>
                {this.props.appData.nickname || '- -'}
              </Text>
              {this.props.appData.patientState === 'ACTIVE' && (
                <Image
                  source={require('../../assets/images/icon-identity-outpatient.png')}
                  style={{ width: 64, height: 18, marginTop: 4, marginLeft: 10 }}
                />
              )}
            </View>
            <View>
              <Text style={{ color: GRAY102 }}>
                {this.props.appData.mobile &&
                  this.props.appData.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
              </Text>
            </View>
          </View>
        </TopView>

        <MarginTopView>
          <RowWithDisclosureIndicator
            title="我的门诊"
            onPress={() => this.props.navigation.navigate('OutpatientService')}
          />
        </MarginTopView>

        <MarginTopView>
          <RowWithIcons
            title="健康数据"
            icons={[
              {
                icon: require('../../assets/images/icon-token.png'),
                text: '饮食代币',
                onPress: () => this.props.navigation.navigate('DietTab'),
              },
              {
                icon: require('../../assets/images/icon-bodydata.png'),
                text: '身体档案',
                onPress: () => this.props.navigation.navigate('BodyFile'),
              },
              {
                icon: require('../../assets/images/icon-laboratory.png'),
                text: '化验检查',
                onPress: () => this.props.navigation.navigate('LaboratoryExamination'),
              },
            ]}
          />
        </MarginTopView>

        <MarginTopView>
          <FlatList
            data={[
              {
                key: '使用指南',
                onPress: () => this.props.navigation.navigate('UserGuidance'),
              },
              {
                key: '账号绑定',
                onPress: () => this.props.navigation.navigate('AccountBinding'),
              },
              {
                key: '意见反馈',
                onPress: () => this.props.navigation.navigate('Feedback'),
              },
              {
                key: '关于我们',
                onPress: () => this.props.navigation.navigate('AboutUs'),
              },
            ]}
            renderItem={({ item }) => (
              <RowWithDisclosureIndicator title={item.key} onPress={() => item.onPress()} />
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

export const Preferences = connect(mapStateToProps, mapDispatchToProps)(_Preferences)

const RootView = styled.ScrollView`
  background-color: ${LIGHT_THEME_ALT_BACKGROUND_COLOR};
  flex: 1;
`

const TopView = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  height: 100;
  padding-left: 16px;
  margin-top: 10px;
`

const ImageView = styled.Image`
  height: 60;
  width: 60;
  margin-right: 26;
  border-radius: 30;
`

const MarginTopView = styled.View`margin-top: 10px;`

const SeparatorLine = styled.View`
  height: 1;
  background-color: ${GRAY230};
`
