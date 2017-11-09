import { inputValidation } from '../utils/inputValidation'

test('when X is pressed remove last input', () => {
  expect(inputValidation('3', 'X')).toBe('')
})

describe('when . is pressed', () => {
  it('and initial value is empty return 0.', () => {
    expect(inputValidation('', '.')).toBe('0.')
  })

  it('and initial value includes . do nothing', () => {
    expect(inputValidation('3.', '.')).toBe('3.')
  })

  it('and initial value does not include . add . to initial', () => {
    expect(inputValidation('3', '.')).toBe('3.')
  })

  it('and initial value is 33 do nothing', () => {
    expect(inputValidation('33', '.')).toBe('33')
  })
})
describe('when zero is pressed', () => {
  it('and initial value is 0 should remove 0', () => {
    expect(inputValidation('0', '3')).toBe('3')
  })
})
describe('when zero is pressed', () => {
  it('and initial value is 0 should remove 0', () => {
    expect(inputValidation(0, 0)).toBe('0')
  })
})
describe('when number is pressed', () => {
  it('and initial value is 0 should remove 0', () => {
    expect(inputValidation('0', '3')).toBe('3')
  })

  it('and resulting number would be higher than 33 do nothing', () => {
    expect(inputValidation('3', '4')).toBe('3')
  })

  it('return number appended to initial value', () => {
    expect(inputValidation('3', '3')).toBe('33')
  })

  it('return number appended to inital value unless it has a decimal place', () => {
    expect(inputValidation('3.1', '2')).toBe('3.1')
  })

  it('return number appended to large inital value with decimal place', () => {
    expect(inputValidation('31.', '9')).toBe('31.9')
  })
})
