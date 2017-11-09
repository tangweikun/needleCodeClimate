export function addFood(key) {
  return {
    type: 'ADD_FOOD',
    key,
  }
}

export function subtractFood(key) {
  return {
    type: 'SUBTRACT_FOOD',
    key,
  }
}

export function resetDiet() {
  return {
    type: 'RESET_DIET',
  }
}
