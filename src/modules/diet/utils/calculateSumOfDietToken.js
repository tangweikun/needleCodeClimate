import { foods } from '../constants'
// naming is wrong
export function calculateSumOfDietToken(selectedFoods, foodLookup) {
  const sumOfMacros = {
    carbohydrate: 0,
    protein: 0,
    fat: 0,
  }
  // for each food item with portion greater than zero
  selectedFoods.forEach(selectedFoodItem => {
    const numberOfPortion = foodLookup[selectedFoodItem.key]
    Object.entries(selectedFoodItem).forEach(([key, value]) => {
      if (key === 'carbohydrate') sumOfMacros.carbohydrate += value * numberOfPortion
      if (key === 'protein') sumOfMacros.protein += value * numberOfPortion
      if (key === 'fat') sumOfMacros.fat += value * numberOfPortion
    })
  })

  return sumOfMacros
}

export const getMacrosFromJSON = selectedFood => {
  const macroNutrients = {
    carbohydrate: 0,
    protein: 0,
    fat: 0,
  }

  selectedFood.forEach(x => {
    const macros = foods.find(({ key }) => key === x.key) || {}
    Object.entries(macros).forEach(([key, value]) => {
      if (key === 'carbohydrate') macroNutrients.carbohydrate += value * x.portionSize
      if (key === 'protein') macroNutrients.protein += value * x.portionSize
      if (key === 'fat') macroNutrients.fat += value * x.portionSize
    })
  })

  return macroNutrients
}
export const getMacrosFromStore = (foodItem, foodBasket) => {
  // selected food structure
  // {
  //   key: 'whiteRice',
  //   name: '白米饭',
  //   protein: 0.182,
  //   carbohydrate: 0.896,
  //   fat: 0.03,
  //   avatar: require('../../assets/images/food/white_rice.jpg'),
  // }
  // foodbasket structure
  // key:1
  // rice:2
  // find one item from main food list
  const macros = foods.find(({ key }) => key === foodItem.key) || {}
  return {
    carbohydrate: macros.carbohydrate * (foodBasket[foodItem.key] || 0),
    protein: macros.protein * (foodBasket[foodItem.key] || 0),
    fat: macros.fat * (foodBasket[foodItem.key] || 0),
  }
}
