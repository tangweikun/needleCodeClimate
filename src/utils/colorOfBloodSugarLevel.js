import { PRIMARY_COLOR, LIGHT_GREEN, DARK_RED, LIGHT_ORANGE } from '../constants'
import { goal } from '../modules/measurement/utils/goal'

const BloodSugarLabel = {
  lower: DARK_RED,
  upper: LIGHT_ORANGE,
  normal: LIGHT_GREEN,
}

export const getColorOfBloodSugarLevel = (result, digestiveState, defaultColor) => {
  if (!digestiveState || !result) return defaultColor || PRIMARY_COLOR

  const goalUpperLimit = goal[digestiveState].upper
  const goalLowerLimit = goal[digestiveState].lower

  if (result < goalLowerLimit) return BloodSugarLabel.lower
  if (result > goalUpperLimit) return BloodSugarLabel.upper
  return BloodSugarLabel.normal
}
