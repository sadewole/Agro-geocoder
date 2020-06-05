import {
  ALERT_ERROR,
  ALERT_SUCCESS,
  CLEAR_ERROR
} from '../action/types'

const initialState = {
  msg: null,
  status: null,
  id: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ALERT_ERROR:
    case ALERT_SUCCESS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      }
        case CLEAR_ERROR:
      return {
        msg: null,
        status: null,
        id: null
      }

        default:
      return state
  }
}
