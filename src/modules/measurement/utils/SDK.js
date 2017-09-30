import {
  iHealthDeviceManagerModule,
  BG1Module,
  BG1ProfileModule,
} from '@ihealth/ihealthlibrary-react-native'
import { Observable } from 'rxjs'
import { DeviceEventEmitter, Platform } from 'react-native'
import { convertToMMOLString } from './convertUnit'

export const {
  Event_Scan_Finish,
  Event_Device_Disconnect,
  Event_Scan_Device,
  Event_Device_Connected,
  Event_Device_Connect_Failed,
} = iHealthDeviceManagerModule
export const {
  ACTION_BG1_SENDCODE_RESULT,
  ACTION_BG1_MEASURE_ERROR,
  ACTION_BG1_MEASURE_STRIP_IN,
  ACTION_BG1_MEASURE_GET_BLOOD,
  ACTION_BG1_MEASURE_RESULT,
  ACTION_BG1_MEASURE_STRIP_OUT,
  ACTION_BG1_MEASURE_STANDBY,
} = BG1ProfileModule
export const { Event_Notify } = BG1Module
export const startDiscovery = () => {
  iHealthDeviceManagerModule.startDiscovery(iHealthDeviceManagerModule.BG1)
}

export const stopDiscovery = () => {
  iHealthDeviceManagerModule.stopDiscovery()
}

export const connectToBG1 = () => {
  iHealthDeviceManagerModule.connectDevice('', 'BG1')
}

export const requestMeasurement = () => {
  const QRCode = '02554064554014322D1200A05542D3BACE1446CE9A96190122EFEE4D1864'
  const stripType = 2
  const measureType = 1
  BG1Module.sendCode(QRCode, stripType, measureType)
}

export const getErrorCodeFromResponse = response =>
  (Platform.OS === 'ios' ? response.action_measure_error_for_bg1 : response.error_num_for_bg1)

export const getUSMeasurementFromResponse = response =>
  (Platform.OS === 'ios' ? response.result.Result : response.measure_result_for_bg1)

export const getChinaMeasurementFromResponse = response =>
  convertToMMOLString(getUSMeasurementFromResponse(response))

export const eventSequence = () =>
  Observable.merge(
    Observable.fromEvent(DeviceEventEmitter, Event_Scan_Device).map(response => ({
      ...response,
      eventName: Event_Scan_Device,
    })),
    Observable.fromEvent(DeviceEventEmitter, Event_Scan_Finish).map(response => ({
      ...response,
      eventName: Event_Scan_Finish,
    })),
    Observable.fromEvent(DeviceEventEmitter, Event_Device_Connected).map(response => ({
      ...response,
      eventName: Event_Device_Connected,
    })),
    Observable.fromEvent(DeviceEventEmitter, Event_Device_Disconnect).map(response => ({
      ...response,
      eventName: Event_Device_Disconnect,
    })),
    Observable.fromEvent(DeviceEventEmitter, Event_Device_Connect_Failed).map(response => ({
      ...response,
      eventName: Event_Device_Connect_Failed,
    })),
    Observable.fromEvent(DeviceEventEmitter, BG1Module.Event_Notify).map(response => ({
      ...response,
      eventName: BG1Module.Event_Notify,
    })),
  )
