import {
  heightWeightInputValidator,
  heightWeightReasonableNumberValidator,
} from '../utils/inputValidation'

test('when 1 is pressed add 1', () => {
  expect(heightWeightInputValidator('3', '31')).toBe('31')
})

test('when . is pressed do nothing', () => {
  expect(heightWeightInputValidator('3', '.')).toBe('3')
})

test('when , is pressed do nothing', () => {
  expect(heightWeightInputValidator('3', ',')).toBe('3')
})

test('when height is 600 cm should fail', () => {
  expect(heightWeightReasonableNumberValidator('600')).toBe(false)
})
test('when height is 0 cm should fail', () => {
  expect(heightWeightReasonableNumberValidator('0')).toBe(false)
})

test('when height is 170 cm should pass', () => {
  expect(heightWeightReasonableNumberValidator('170')).toBe(true)
})
