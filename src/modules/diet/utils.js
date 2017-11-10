export const BREAKFAST_PROPORTION = 0.2
export const LUNCH_PROPORTION = 0.4
export const DINNER_PROPORTION = 0.4
export const CARBOHYDRATE_PROPORTION = 0.5
export const PROTEIN_PROPORTION = 0.2
export const FAT_PROPORTION = 0.3
export const CARBOHYDRATE_EXCHANGE_RATE = 80
export const PROTEIN_EXCHANGE_RATE = 40
export const FAT_EXCHANGE_RATE = 63

// TODO: should rename getDailyDietToken to a suitable name
export function getDailyDietToken({ weight, height, proportion, exchangeRate }) {
  const dailyEnergyNeeds = getDailyEnergyNeeds({ weight, height }) * proportion
  return dailyEnergyNeeds / exchangeRate
}

// 一日能量需求=理想体重*能量系数
const getDailyEnergyNeeds = ({ weight, height }) =>
  getIdealWeight(height) * getEnergyCoefficient({ height, weight })

// 能量系数
const getEnergyCoefficient = ({ height, weight }) => {
  const BMI = getBMI({ height, weight })

  if (BMI >= 18.5 && BMI <= 23.9) return 30
  if (BMI > 0 && BMI < 18.5) return 35
  if (BMI >= 24) return 25

  return null
}

// 理想体重=身高*身高*22 (身高单位：m)
const getIdealWeight = height => 22 * squareOfHeight(height)

// BMI=体重/(身高*身高) (身高单位：m)
const getBMI = ({ weight, height }) => {
  if (weight && height) return weight / squareOfHeight(height)
  return null
}

const squareOfHeight = height => Math.pow(height / 100, 2)
