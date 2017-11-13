import { DEFAULT_HEIGHT, DEFAULT_WEIGHT } from '../../../utils/pickerContent'

export const BREAKFAST_PROPORTION = 0.2
export const LUNCH_PROPORTION = 0.4
export const DINNER_PROPORTION = 0.4
export const CARBOHYDRATE_PROPORTION = 0.5
export const PROTEIN_PROPORTION = 0.2
export const FAT_PROPORTION = 0.3
export const CARBOHYDRATE_EXCHANGE_RATE = 80
export const PROTEIN_EXCHANGE_RATE = 40
export const FAT_EXCHANGE_RATE = 63

export const getDailyMacroTokens = ({ weight = DEFAULT_WEIGHT, height = DEFAULT_HEIGHT }) => ({
  breakfast: getMealMacroTokens({ weight, height, mealTime: BREAKFAST_PROPORTION }),
  lunch: getMealMacroTokens({ weight, height, mealTime: LUNCH_PROPORTION }),
  dinner: getMealMacroTokens({ weight, height, mealTime: DINNER_PROPORTION }),
})

export const getMealMacroTokens = ({
  weight = DEFAULT_WEIGHT,
  height = DEFAULT_HEIGHT,
  mealTime,
}) => {
  const dailyProtein = getDailyDietToken({
    weight,
    height,
    proportion: PROTEIN_PROPORTION,
    exchangeRate: PROTEIN_EXCHANGE_RATE,
  })
  const dailyCarbs = getDailyDietToken({
    weight,
    height,
    proportion: CARBOHYDRATE_PROPORTION,
    exchangeRate: CARBOHYDRATE_EXCHANGE_RATE,
  })
  const dailyFat = getDailyDietToken({
    weight,
    height,
    proportion: FAT_PROPORTION,
    exchangeRate: FAT_EXCHANGE_RATE,
  })
  return {
    carbohydrates: +(dailyCarbs * mealTime).toFixed(2),
    fat: +(dailyFat * mealTime).toFixed(2),
    protein: +(dailyProtein * mealTime).toFixed(2),
  }
}

export function getDailyDietToken({
  weight = DEFAULT_WEIGHT,
  height = DEFAULT_HEIGHT,
  proportion,
  exchangeRate,
}) {
  const dailyEnergyNeeds = getDailyEnergyNeeds({ weight, height }) * proportion
  return +(dailyEnergyNeeds / exchangeRate).toFixed(2)
}

// 一日能量需求=理想体重*能量系数 daily energy requirement = ideal weight * energy coefficient
export const getDailyEnergyNeeds = ({ weight = DEFAULT_WEIGHT, height = DEFAULT_HEIGHT }) =>
  getIdealWeight(height) * getEnergyCoefficient({ height, weight })

// 能量系数 energy coefficient
export const getEnergyCoefficient = ({ weight = DEFAULT_WEIGHT, height = DEFAULT_HEIGHT }) => {
  const BMI = getBMI({ height, weight })
  if (BMI < 18.5) return 35
  if (BMI >= 24) return 25
  return 30
}

// 理想体重=身高*身高*22 (身高单位：m) ideal weight = height in meters squared times 22
export const getIdealWeight = height => 22 * squareOfHeightInMeters(height)

// BMI=体重/(身高*身高) (身高单位：m) BMI = weight / height in meters squared
export const getBMI = ({ weight = DEFAULT_WEIGHT, height = DEFAULT_HEIGHT }) => {
  if (!weight) weight = DEFAULT_WEIGHT
  return +(weight / squareOfHeightInMeters(height)).toFixed(2)
}

export const squareOfHeightInMeters = (height = DEFAULT_HEIGHT) => {
  if (!height) height = DEFAULT_HEIGHT
  const heightInMeters = height / 100
  return +(heightInMeters * heightInMeters).toFixed(2)
}
