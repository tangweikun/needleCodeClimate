export const convertToMMOLString = result => {
  if (!result) return ''
  return (result / 18).toFixed(1)
}

export const convertBloodGlucoseObjectToMMOLString = result => {
  if (!result) return ''
  if (!result.value) return ''
  if (!result.unit) return ''
  if (result.unit.toLowerCase() === 'mg/dl') return (result.value / 18).toFixed(1)
  return result.value
}
