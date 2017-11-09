const initialState = {}

export default function dietReducer(state = initialState, action) {
  const { type, key } = action

  switch (type) {
    case 'ADD_FOOD':
      return {
        ...state,
        [key]: (state[key] || 0) + 1,
      }

    case 'SUBTRACT_FOOD':
      return {
        ...state,
        [key]: state[key] - 1,
      }

    case 'RESET_DIET':
      return {}

    default:
      return state
  }
}
