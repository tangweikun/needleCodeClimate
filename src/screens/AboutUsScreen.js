import * as React from 'react'
import { Image, View } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { toggleDevMode } from '../ducks/actions'
import {
  LIGHT_THEME_ALT_TEXT_COLOR,
  LIGHT_THEME_TEXT_COLOR,
  DARK_THEME_BACKGROUND_COLOR,
} from '../constants'
import { getUsefulDeviceContext } from '../utils/deviceContext'

const device = getUsefulDeviceContext()
export class _AboutUsScreen extends React.Component {
  static navigationOptions = () => ({
    title: '软件版本',
  })
  devMode() {
    this.props.toggleDevMode()
  }
  render() {
    return (
      <RootView>
        <Touch onLongPress={() => this.devMode()}>
          <View
            style={{
              height: 70,
              width: 70,
              marginTop: 140,
              backgroundColor: DARK_THEME_BACKGROUND_COLOR,
              borderRadius: 8,
            }}
          >
            <Image
              style={{
                height: 70,
                width: 70,
              }}
              resizeMode="contain"
              source={require('../assets/images/icon_login_app.png')}
            />
          </View>
        </Touch>

        <ProductName>护血糖</ProductName>
        <Regular>服务电话</Regular>
        <PhoneNumber>400-000-6813</PhoneNumber>
        <Regular>{`客户端版本${device.readableVersion}`}</Regular>
        <Small>北京爱和健康科技有限公司版权所有</Small>
        <Small>Copyright 2017</Small>
      </RootView>
    )
  }
}

const mapStateToProps = state => ({ appData: state.appData })
function mapDispatchToProps(dispatch) {
  return {
    toggleDevMode: () => dispatch(toggleDevMode()),
  }
}
export const AboutUsScreen = connect(mapStateToProps, mapDispatchToProps)(_AboutUsScreen)
const Touch = styled.TouchableWithoutFeedback``
const ProductName = styled.Text`
  color: ${LIGHT_THEME_ALT_TEXT_COLOR};
  font-size: 18;
  padding-bottom: 20;
  padding-top: 10;
`
const Regular = styled.Text`
  color: ${LIGHT_THEME_TEXT_COLOR};
  font-size: 18;
  margin: 5px;
`
const PhoneNumber = styled.Text`
  color: ${LIGHT_THEME_TEXT_COLOR};
  font-size: 22;
  margin: 5px;
  padding-bottom: 30;
`
const Small = styled.Text`
  color: ${LIGHT_THEME_TEXT_COLOR};
  font-size: 12;
  margin: 5px;
`
const RootView = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
`
