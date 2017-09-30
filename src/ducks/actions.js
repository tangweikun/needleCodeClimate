export function measureSuccess(measureResult) {
  return {
    type: 'MEASURE_SUCCESS',
    measureResult,
  }
}

export function measureError(summary) {
  return {
    type: 'MEASURE_ERROR',
    summary,
  }
}

export function measureEvent(eventName) {
  return {
    type: 'MEASURE_EVENT',
    eventName,
  }
}

export function setDigestiveState(digestiveState) {
  return {
    type: 'SET_DIGESTIVE_STATE',
    digestiveState,
  }
}

export function setPatient(userInfo) {
  return {
    type: 'SET_PATIENT',
    userInfo,
  }
}

export function resetDevice() {
  return {
    type: 'RESET_DEVICE',
  }
}

export function toggleDevMode() {
  return {
    type: 'TOGGLE_DEV',
  }
}

export function saveManualRecord(digestiveState, measureResult, measuredAt) {
  return {
    type: 'SAVE_MANUAL_RECORD',
    measureResult,
    digestiveState,
    measuredAt,
  }
}

export function resetManualRecord() {
  return {
    type: 'RESET_MANUAL_RECORD',
  }
}
