import React from 'react'
import { AsyncStorage, Platform, Alert, Linking, NativeModules, Image } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { NavigationActions } from 'react-navigation'
import { setPatient } from '../ducks/actions'
import { APP_UPGRADE_API, ScreenWidth } from '../constants'
import { getUsefulDeviceContext } from '../utils/deviceContext'

const device = getUsefulDeviceContext()
class _FirstScreen extends React.Component {
  async componentDidMount() {
    await AsyncStorage.getItem('userInfo', (err, userInfo) => {
      this.props.setPatient(JSON.parse(userInfo) || {})
    })

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'First' })],
    })

    const resetAction2 = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'LoginOrSignUp' })],
    })

    this.checkAppNewVersion()

    if (!this.props.appData.patientId) {
      this.props.navigation.dispatch(resetAction2)
    } else {
      this.props.navigation.dispatch(resetAction)
    }
  }

  checkAppNewVersion = () => {
    let reqBody = Platform.OS === 'ios' ? 'app=com.ihealthlabs.HuTang' : 'app=com.ihealth.HuTang'
    reqBody += `&current=${device.readableVersion}`

    fetch(APP_UPGRADE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: reqBody,
    })
      .then(response => response.json())
      .then(response => {
        const responeaData = response.data
        if (responeaData && responeaData.upgrade) {
          Alert.alert('是否下载新版本App?', '', [
            {
              text: '取消',
              onPress: () => this.denyUpgrade(responeaData.required_version === 1),
            },
            {
              text: '下载',
              onPress: () => this.allowUpgrade(responeaData),
            },
          ])
        }
      })
      .catch(e => {
        console.log('error', e)
      })
  }

  allowUpgrade = response => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://itunes.apple.com/us/app/护血糖/id1284007492?l=zh&ls=1&mt=8')
    } else {
      NativeModules.upgrade.upgrade(response.target_link)
    }

    if (response.required_version === 1) {
      console.log('close app')
    }
  }

  denyUpgrade = isForceUpdate => {
    if (isForceUpdate) {
      console.log('close app')
    }
  }

  render() {
    return (
      <RootView>
        <Image
          style={{ flex: 1, width: ScreenWidth }}
          resizeMode="contain"
          source={require('../assets/images/splash.png')}
        />
      </RootView>
    )
  }
}

const mapStateToProps = state => ({ appData: state.appData })

const mapDispatchToProps = dispatch => ({
  setPatient: g => dispatch(setPatient(g)),
})

export const FirstScreen = connect(mapStateToProps, mapDispatchToProps)(_FirstScreen)

const RootView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
