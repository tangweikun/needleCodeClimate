import { combineReducers } from 'redux'
import appData from './ducks/reducer'

const rootReducer = combineReducers({
  appData,
})

export default rootReducer
