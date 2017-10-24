import React from 'react'
import { AsyncStorage, Platform, Alert, Linking, NativeModules, Image } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { setPatient } from '../ducks/actions'
import { APP_UPGRADE_API } from '../constants'
import { getUsefulDeviceContext } from '../utils/deviceContext'

const device = getUsefulDeviceContext()
class _FirstScreen extends React.Component {
  async componentDidMount() {
    await AsyncStorage.getItem('userInfo', (err, userInfo) => {
      this.props.setPatient(JSON.parse(userInfo) || {})
    })
    this.checkAppNewVersion()

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

  allowUpgrade = responeaData => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://itunes.apple.com/us/app/护血糖/id1284007492?l=zh&ls=1&mt=8')
    } else {
      NativeModules.upgrade.upgrade(responeaData.target_link)
    }

    if (responeaData.required_version === 1) {
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
          style={{ flex: 1 }}
          resizeMode="contain"
          source={require('../assets/images/splash.jpg')}
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
