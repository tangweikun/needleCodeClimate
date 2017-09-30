import { iHealthDeviceManagerModule, BG1ProfileModule } from '@ihealth/ihealthlibrary-react-native'

export const measureSteps = {
  disconnected: 0,
  insertedDevice: 1,
  connectionEstablished: 2,
  insertedTestStrip: 3,
  insertedBlood: 4,
  testSuccess: 5,
  // TODO: consider breaking this out into another object for other states
  standby: 6,
  connectionFailed: 7,
  measureError: 8,
  stripRemoved: 9,
  requestMeasurement: 10,
  unexpectedResponse: 11,
}
const {
  Event_Device_Disconnect,
  Event_Scan_Device,
  Event_Device_Connected,
  Event_Device_Connect_Failed,
} = iHealthDeviceManagerModule
const {
  ACTION_BG1_SENDCODE_RESULT,
  ACTION_BG1_MEASURE_ERROR,
  ACTION_BG1_MEASURE_STRIP_IN,
  ACTION_BG1_MEASURE_GET_BLOOD,
  ACTION_BG1_MEASURE_RESULT,
  ACTION_BG1_MEASURE_STRIP_OUT,
  ACTION_BG1_MEASURE_STANDBY,
} = BG1ProfileModule
const {
  disconnected,
  insertedDevice,
  connectionEstablished,
  connectionFailed,
  requestMeasurement,
  measureError,
  insertedTestStrip,
  insertedBlood,
  testSuccess,
  stripRemoved,
  standby,
} = measureSteps
export const eventMap = [
  { e: Event_Device_Disconnect, step: disconnected },
  { e: Event_Scan_Device, step: insertedDevice },
  { e: Event_Device_Connected, step: connectionEstablished },
  { e: Event_Device_Connect_Failed, step: connectionFailed },
  { e: ACTION_BG1_SENDCODE_RESULT, step: requestMeasurement },
  { e: ACTION_BG1_MEASURE_ERROR, step: measureError },
  { e: ACTION_BG1_MEASURE_STRIP_IN, step: insertedTestStrip },
  { e: ACTION_BG1_MEASURE_GET_BLOOD, step: insertedBlood },
  { e: ACTION_BG1_MEASURE_RESULT, step: testSuccess },
  { e: ACTION_BG1_MEASURE_STRIP_OUT, step: stripRemoved },
  { e: ACTION_BG1_MEASURE_STANDBY, step: standby },
]
