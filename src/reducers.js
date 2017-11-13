import { combineReducers } from 'redux'
import appData from './ducks/reducer'
import foodBasket from './modules/diet/reducer'

const rootReducer = combineReducers({
  appData,
  foodBasket,
})

export default rootReducer
