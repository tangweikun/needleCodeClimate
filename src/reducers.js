import { combineReducers } from 'redux'
import appData from './ducks/reducer'
import diet from './modules/diet/reducer'

const rootReducer = combineReducers({
  appData,
  diet,
})

export default rootReducer
