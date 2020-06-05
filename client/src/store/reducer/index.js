import {
  combineReducers
} from 'redux'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import marketReducer from './marketReducer'

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  market: marketReducer
})
