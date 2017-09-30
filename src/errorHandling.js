import { Alert } from 'react-native'
// import RNRestart from 'react-native-restart';
import { setJSExceptionHandler } from 'react-native-exception-handler'
import { setNativeExceptionHandler } from 'react-native-exception-handler/index'
import { uri } from './endpoint'

// TODO: send to our team slack with device and user info

setNativeExceptionHandler(exceptionString => {
  console.log('NATIVE EXCEPTION')
  // NOTE this sometimes works
  console.log('NATIVE EXCEPTION', exceptionString)
  // NOTE this never works, maybe try writing a log to an async storage queue and writing it later
  // fetch(`${uri}log`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: exceptionString,
  // })
  // This is your custom global error handler
  // You do stuff likehit google analytics to track crashes.
  // or hit a custom api to inform the dev team.
  // NOTE: alert or showing any UI change via JS
  // WILL NOT WORK in case of NATIVE ERRORS.
})
const errorHandler = (e, isFatal) => {
  console.log('JAVASCRIPT EXCEPTION')
  if (e) {
    fetch(`${uri}log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: e.name, message: e.message }),
    })
  }
  if (isFatal) {
    Alert.alert(
      '请把错误截图发送给客服人员，尝试关闭APP再重新打开',
      `
        ${e.name} 
        ${e.message}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // RNRestart.Restart(); Do nothing
          },
        },
      ],
    )
  } else {
    console.log(e) // So that we can see it in the ADB logs in case of Android if needed
  }
}
// NOTE: set this to true if you want to see this behaviour in debug mode
setJSExceptionHandler(errorHandler, false)
