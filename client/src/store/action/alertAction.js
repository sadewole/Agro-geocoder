import {
  ALERT_SUCCESS,
  ALERT_ERROR,
  CLEAR_ERROR
} from './types'

export const returnError = (status, msg, id = null) => {
  return {
    type: ALERT_ERROR,
    payload: {
      status,
      msg: msg.message,
      id
    }
  }
}

export const returnSuccess = (status = 200, msg, id = null) => {
  return {
    type: ALERT_SUCCESS,
    payload: {
      status,
      msg: msg.message,
      id
    }
  }
}

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  }
}
