export const getSummaryByErrorCode = code =>
  getDeviceStateByErrorCode(code).summary || `unknown error code: ${code}`
export const getAdviceByErrorCode = code =>
  getDeviceStateByErrorCode(code).advice || [`unknown error code: ${code}`]
export const getDeviceStateByErrorCode = code =>
  Object.values(deviceStates).find(x => x.errorCode && x.errorCode.includes(code)) || {
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
    note: `unknown error code: ${code}`,
    summary: `unknown error code: ${code}`,
  }
export const getAdviceByKey = key => deviceStates[key].advice || [`unknown key: ${key}`]

export const deviceStates = {
  INSERT_DEVICE: {
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
    note: 'INSERT_DEVICE',
    summary: '请将血糖仪插入耳机孔',
  },
  WAIT_FOR_CONNECTION: {
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
    note: 'WAIT_FOR_CONNECTION',
    summary: '等待连接中...',
  },
  INSERT_TEST_STRIP: {
    advice: ['先拔出试纸，再重新把试纸插入血糖仪', '将试纸的红色箭头对准血糖仪'],
    note: 'INSERT_TEST_STRIP',
    summary: '请将试纸插入血糖仪',
  },
  DRAW_BLOOD: {
    advice: ['先拔出试纸，再重新把试纸插入血糖仪'],
    note: 'DRAW_BLOOD',
    summary: '请将试纸底端接触手指出血处',
  },
  WAIT_FOR_RESULT: {
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
    note: 'WAIT_FOR_RESULT',
    summary: '等待测量结果中...',
  },
  SUCCESS: {
    note: 'SUCCESS',
    summary: '测量成功',
    advice: ['COMING SOON: some suggestions for patient based on healthy or health results'],
  },
  CONNECTION_FAILED: {
    errorCode: [900],
    note: 'CONNECTION_FAILED',
    summary: '连接失败',
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
  },
  LOW_BATTERY: {
    errorCode: [0],
    advice: ['请更换电池，再重新开始测量'],
    note: 'Battery is low.',
    summary: '电量过低',
  },
  OUT_OF_RANGE: {
    errorCode: [1],
    advice: ['确保采血部位已清洁，无果糖残留', '确保采血量足够', '确保采血量不足时未挤压采血部位', '确保试纸存放得当'],
    note: 'Glucose test result is out of the measurement range.',
    summary: '测量结果异常',
  },
  INTERFERENCE: {
    errorCode: [2],
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
    note: 'Unknown interference detected, please repeat the test.',
    summary: '检测到未知干扰，请重新测试',
  },
  MOISTURE: {
    errorCode: [3],
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔', '请丢弃测试条，用新的测试条重新测试'],
    note:
      'Strip is used or unknown moisture detected, discard the test strip and repeat the test with a new strip.',
    summary: '测试条已被使用过或者存在未知干扰',
  },
  REPEAT_TEST: {
    errorCode: [4, 8],
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
    note: 'Communication error,resend the code to repeat the test.',
    summary: '通信错误，请重新测试',
  },
  TEMPERATUREOUTOFRANGE: {
    errorCode: [5, 6],
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔', '将血糖仪放置中室温下30分钟后，再重新测试'],
    note:
      'The environmental temperature is beyond normal range, place the meter at room temperature for at least 30 minutes, then repeat the test.',
    summary: '当前环境温度超出正常范围',
  },
  BAD_TEST_STRIP: {
    errorCode: [7],
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔', '请用新的测试条重复测试'],
    note: 'Test strip coding error.',
    summary: '测试条编码错误',
  },
  NEW_STRIP_REPEAT_TEST: {
    errorCode: [9, 10, 11],
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔', '请用新的测试条重复测试', '联系iHealth的客户服务'],
    note:
      'Communication error,Repeat the test with a new test strip. If the problem persists, contact iHealth customer service for assistance.',
    summary: '通信错误',
  },
  LOW_RESULT: {
    errorCode: [12],
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
    note: 'Glucose test result is low.',
    summary: '测试结果过低',
  },
  HIGH_RESULT: {
    errorCode: [13],
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔', '请洗手后再测量'],
    note: 'Glucose test result is high.',
    summary: '测试结果过高',
  },
  SLEEP_MODE: {
    errorCode: [101],
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
    note: 'Device was left on standby for over 3 minutes and has gone to sleep.',
    summary: '设备待机超3分钟，已经进入睡眠模式',
  },
  HAND_SHAKE_FAILED: {
    errorCode: [102],
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
    note: 'Handshake failed.',
    summary: '握手失败',
  },
  OUT_OF_RANGE_PARAMETERS: {
    errorCode: [400],
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
    note: 'Parameters out of range.',
    summary: '参数超出范围',
  }, // possibly means qrcode is wrong
  TURN_OFF_DOLBY: {
    errorCode: [401],
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
    note: 'Dolby is on ,please turn it off.',
    summary: '请拔出设备',
  },
  UNKNOWN: {
    advice: ['先拔出血糖仪，再重新把血糖仪插入耳机孔'],
    note: 'unknown',
    summary: 'unknown',
  },
}
