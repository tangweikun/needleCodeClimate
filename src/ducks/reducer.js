import { Event_Device_Disconnect } from '../modules/measurement/utils/SDK'
import { initialEnv } from '../endpoint'

const initialState = {
  fail: false,
  success: false,
  latestEvent: Event_Device_Disconnect,
  digestiveState: '',
  measureResult: 0,
  patientId: '',
  avatar: '',
  nickname: '',
  devMode: false,
  env: initialEnv,
  manualRecord: {},
  measureTimes: {
    monday: ['BEFORE_BREAKFAST', 'AFTER_BREAKFAST'],
    tuesday: [],
    wednesday: ['BEFORE_LUNCH', 'AFTER_LUNCH'],
    thursday: [],
    friday: ['BEFORE_DINNER', 'AFTER_DINNER'],
    saturday: [],
    sunday: [],
  },
}
export default function bg1Reducer(state = initialState, action) {
  const { type, summary, measureResult, eventName, digestiveState, userInfo, measuredAt } = action
  switch (type) {
    case 'MEASURE_ERROR':
      return {
        ...state,
        fail: true,
        summary,
      }

    case 'MEASURE_SUCCESS':
      return {
        ...state,
        fail: false,
        success: true,
        measureResult,
      }

    case 'MEASURE_EVENT':
      return {
        ...state,
        fail: false,
        latestEvent: eventName,
      }

    case 'SET_DIGESTIVE_STATE':
      return {
        ...state,
        digestiveState,
      }

    case 'SET_PATIENT':
      return {
        ...state,
        ...userInfo,
      }

    case 'RESET_DEVICE':
      return {
        ...state,
        success: false,
        digestiveState: '',
        measureResult: 0,
      }

    case 'TOGGLE_DEV':
      return {
        ...state,
        devMode: !state.devMode,
      }

    case 'SAVE_MANUAL_RECORD':
      return {
        ...state,
        manualRecord: {
          ...state.manualRecord,
          digestiveState,
          measureResult,
          measuredAt,
        },
      }

    case 'RESET_MANUAL_RECORD':
      return {
        ...state,
        manualRecord: {},
      }

    default:
      return state
  }
}
