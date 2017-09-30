import moment from 'moment'
import { nextPlan } from '../nextTreatmentPlan'
// 1. get all plans
const treatmentPlan = [
  {
    testTimes: {
      monday: ['BEFORE_BREAKFAST', 'AFTER_BREAKFAST'],
      tuesday: [],
      wednesday: ['BEFORE_LUNCH', 'AFTER_LUNCH'],
      thursday: [],
      friday: ['BEFORE_DINNER', 'AFTER_DINNER'],
      saturday: [],
      sunday: [],
    },
    startAt: '2017-07-14T08:00:00.000Z',
    endAt: '2017-10-13T08:00:00.000Z',
  },
  {
    testTimes: {
      monday: ['BEFORE_BREAKFAST', 'AFTER_BREAKFAST'],
      tuesday: [],
      wednesday: ['BEFORE_LUNCH', 'AFTER_LUNCH'],
      thursday: [],
      friday: ['BEFORE_DINNER', 'AFTER_DINNER'],
      saturday: [],
      sunday: [],
    },
    startAt: '2017-04-14T08:00:00.000Z',
    endAt: '2017-07-14T08:00:00.000Z',
  },
]

// 4. map this array to chinese digestive state
// 5. from todays measurements find by digestive state
// 6. if all states for today have measurement results then check tomorrow for states, if none check the next day etc.

describe('given today is monday', () => {
  it('and monday has a plan, return that day', () => {
    const expected = ['BEFORE_BREAKFAST', 'AFTER_BREAKFAST']
    const functionUnderTest = nextPlan(treatmentPlan, moment('2017-09-04'))

    expect(functionUnderTest.when).toEqual('2017-09-04')
    expect(functionUnderTest.plan).toEqual(expect.arrayContaining(expected))
  })
})
describe('given today is tuesday', () => {
  it('and wednesday has a plan, return that day', () => {
    const expected = ['BEFORE_LUNCH', 'AFTER_LUNCH']
    const functionUnderTest = nextPlan(treatmentPlan, moment('2017-09-05'))
    expect(functionUnderTest.when).toEqual('2017-09-06')
    expect(functionUnderTest.plan).toEqual(expect.arrayContaining(expected))
  })
})
describe('given today is sunday', () => {
  it('and monday has a plan, return that day', () => {
    const expected = ['BEFORE_BREAKFAST', 'AFTER_BREAKFAST']
    const functionUnderTest = nextPlan(treatmentPlan, moment('2017-09-10'))
    expect(functionUnderTest.when).toEqual('2017-09-11')
    expect(functionUnderTest.plan).toEqual(expect.arrayContaining(expected))
  })
})
describe('given today is saturday', () => {
  it('and monday has a plan, return that day', () => {
    const expected = ['BEFORE_BREAKFAST', 'AFTER_BREAKFAST']
    const functionUnderTest = nextPlan(treatmentPlan, moment('2017-09-09'))
    expect(functionUnderTest.when).toEqual('2017-09-11')
    expect(functionUnderTest.plan).toEqual(expect.arrayContaining(expected))
  })
})
