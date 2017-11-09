export const inputValidation = (initial, keyText) => {
  const result = `${initial}${keyText}`
  if (keyText === 'X') return initial.slice(0, initial.length - 1)

  if (keyText === '.') {
    if (initial === '') return '0.'
    if (containsDecimalPoint(initial)) return initial
    if (initial === '33') return initial
    return result
  }
  if (result === `0${keyText}`) return `${keyText}`
  if (result > 33) return initial
  if (hasMoreThanOneNumberAfterDecimalPoint(result)) return initial
  return result
}

const hasMoreThanOneNumberAfterDecimalPoint = input =>
  input && input.split('.')[1] && input.split('.')[1].length > 1

const containsDecimalPoint = input => input && input.includes('.')

export const heightWeightInputValidator = (initial, inputToValidate) => {
  if (inputToValidate.includes('.')) return initial
  if (inputToValidate.includes(',')) return initial
  return inputToValidate
}

export const heightWeightReasonableNumberValidator = n => !isNaN(parseFloat(n)) && isFinite(n) && +n < 500 && +n > 0
