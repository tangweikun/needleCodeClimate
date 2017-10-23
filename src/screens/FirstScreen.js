import React from 'react'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import styled from 'styled-components/native'
import { VerifyMobileScreen } from '.'
import { setPatient } from '../ducks/actions'
import { REGULAR_FONT, DARK_THEME_BUTTON_TEXT_COLOR } from '../constants'
import Navigation from '../modules/Navigator'

class _FirstScreen extends React.Component {
  async componentDidMount() {
    await AsyncStorage.getItem('userInfo', (err, userInfo) => {
      this.props.setPatient(JSON.parse(userInfo) || {})
    })

    if (!this.props.appData.patientId) {
      this.props.navigation.navigate('LoginNavigation')
    } else {
      this.props.navigation.navigate('HomeTab', {
        patientId: this.props.appData.patientId,
        manualRecord: this.props.appData.manualRecord,
        digestiveState: this.props.appData.digestiveState,
        measureResult: this.props.appData.measureResult,
      })
    }
  }

  render() {
    return (
      <RootView>
        <SplashScreen />
      </RootView>
    )

    // if (!patientId) return <VerifyMobileScreen />

    // return <Navigation screenProps={{ patientId, measureResult, digestiveState, manualRecord }} />
  }
}

function mapStateToProps(state) {
  return {
    appData: state.appData,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setPatient: g => dispatch(setPatient(g)),
  }
}

export const FirstScreen = connect(mapStateToProps, mapDispatchToProps)(_FirstScreen)

const RootView = styled.View`
  flex: 1;
  justify-content: center;
`

const SplashScreen = () => (
  <LogoView>
    <LogoText>{junk}</LogoText>
    <Logo source={require('../assets/images/splash-icon.png')} resizeMode="contain" />
    <LogoText>{name}</LogoText>
  </LogoView>
)
const junk = `优
质
的
健
康
生
活
来
自`
const name = `护
糖`
const Logo = styled.Image`
  width: 80;
  height: 100;
`
const LogoView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const LogoText = styled.Text`
  font-size: ${REGULAR_FONT};
  text-align: center;
  color: ${DARK_THEME_BUTTON_TEXT_COLOR};
  line-height: 30;
`
