import {
  getMealMacroTokens,
  getDailyDietToken,
  BREAKFAST_PROPORTION,
  CARBOHYDRATE_PROPORTION,
  CARBOHYDRATE_EXCHANGE_RATE,
  FAT_PROPORTION,
  FAT_EXCHANGE_RATE,
  LUNCH_PROPORTION,
  DINNER_PROPORTION,
} from '../utils/getDailyDietToken'

describe('when height is undefined, weight undefined', () => {
  const height = undefined
  const weight = undefined
  it('carbohydrates', () => {
    expect(
      getDailyDietToken({
        height,
        weight,
        proportion: CARBOHYDRATE_PROPORTION,
        exchangeRate: CARBOHYDRATE_EXCHANGE_RATE,
      }),
    ).toEqual(11.22)
  })
  it('fat', () => {
    expect(
      getDailyDietToken({
        height,
        weight,
        proportion: FAT_PROPORTION,
        exchangeRate: FAT_EXCHANGE_RATE,
      }),
    ).toEqual(8.55)
  })
  it('breakfast tokens', () => {
    expect(getMealMacroTokens({ height, weight, mealTime: BREAKFAST_PROPORTION })).toEqual({
      carbohydrates: 2.24,
      fat: 1.71,
      protein: 1.8,
    })
  })
  it('lunch tokens', () => {
    expect(getMealMacroTokens({ height, weight, mealTime: LUNCH_PROPORTION })).toEqual({
      carbohydrates: 4.49,
      fat: 3.42,
      protein: 3.59,
    })
  })
  it('dinner tokens', () => {
    expect(getMealMacroTokens({ height, weight, mealTime: DINNER_PROPORTION })).toEqual({
      carbohydrates: 4.49,
      fat: 3.42,
      protein: 3.59,
    })
  })
})
describe('when height is 200, weight 100', () => {
  const height = 200
  const weight = 100
  it('carbohydrates', () => {
    expect(
      getDailyDietToken({
        height,
        weight,
        proportion: CARBOHYDRATE_PROPORTION,
        exchangeRate: CARBOHYDRATE_EXCHANGE_RATE,
      }),
    ).toEqual(13.75)
  })
  it('fat', () => {
    expect(
      getDailyDietToken({
        height,
        weight,
        proportion: FAT_PROPORTION,
        exchangeRate: FAT_EXCHANGE_RATE,
      }),
    ).toEqual(10.48)
  })
  it('breakfast tokens', () => {
    expect(getMealMacroTokens({ height, weight, mealTime: BREAKFAST_PROPORTION })).toEqual({
      carbohydrates: 2.75,
      fat: 2.1,
      protein: 2.2,
    })
  })
  it('lunch tokens', () => {
    expect(getMealMacroTokens({ height, weight, mealTime: LUNCH_PROPORTION })).toEqual({
      carbohydrates: 5.5,
      fat: 4.19,
      protein: 4.4,
    })
  })
  it('dinner tokens', () => {
    expect(getMealMacroTokens({ height, weight, mealTime: DINNER_PROPORTION })).toEqual({
      carbohydrates: 5.5,
      fat: 4.19,
      protein: 4.4,
    })
  })
})
