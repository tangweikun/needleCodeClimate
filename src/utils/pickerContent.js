import Picker from 'react-native-picker'
import moment from 'moment'

export const ShowPicker = (type, pickerData, pickerTitleText, selectedValue, submit, parser) => {
  Picker.init({
    pickerData,
    pickerToolBarFontSize: 16,
    pickerFontSize: 16,
    pickerConfirmBtnText: '确定',
    pickerCancelBtnText: '取消',
    pickerTitleText,
    selectedValue,
    onPickerConfirm: pickedValue => {
      if (parser) submit(type, parser(pickedValue))
      else submit(type, pickedValue[0])
    },
  })
  Picker.show()
}
export const parseBirthDate = birth =>
  moment.parseZone(birth.join('-').replace(/['年','月','日']/g, ''), 'YYYY-M-D').toISOString()
export const displayBirthDate = birth => moment(birth).format('YYYY-MM-DD')

export const parseGender = gender => gender[0].replace('女', 'female').replace('男', 'male')
export const displayGender = gender => gender.replace('female', '女').replace('male', '男')
export const ageRange = () => {
  const date = []
  for (let i = 1950; i < 2050; i++) {
    const month = []
    for (let j = 1; j < 13; j++) {
      const day = []
      if (j === 2) {
        for (let k = 1; k < 29; k++) {
          day.push(`${k}日`)
        }
        // Leap day for years that are divisible by 4, such as 2000, 2004
        if (i % 4 === 0) {
          day.push(`${29}日`)
        }
      } else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
        for (let k = 1; k < 32; k++) {
          day.push(`${k}日`)
        }
      } else {
        for (let k = 1; k < 31; k++) {
          day.push(`${k}日`)
        }
      }
      const _month = {}
      _month[`${j}月`] = day
      month.push(_month)
    }
    const _date = {}
    _date[`${i}年`] = month
    date.push(_date)
  }
  return date
}
export const heightRange = () => {
  const range = []
  for (let i = 20; i < 250; i++) {
    range.push(i)
  }
  return range
}
export const weightRange = () => {
  const range = []
  for (let i = 50; i < 300; i++) {
    range.push(i)
  }
  return range
}
export const genders = ['男', '女']
