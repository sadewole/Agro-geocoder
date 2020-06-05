import setAuthToken from '../../components/utils/setAuthToken'
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOG_OUT,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  RESET_STATE
} from '../action/types'

const initState = {
  token: localStorage.getItem('token'),
  isLoading: false,
  user: null,
  msg: '',
  isAuthenticated: false
}

export default (state = initState, action) => {
  const {
    type,
    payload
  } = action
  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOADED:
      return {
        ...state,
        user: payload.data,
        isAuthenticated: true,
        isLoading: false
      }
    case AUTH_REGISTER:
    case AUTH_LOGIN:
      localStorage.setItem('token', payload.token)
      state.token = localStorage.getItem('token')
      setAuthToken(state.token)
      return {
        ...state,
        isLoading: false,
        token: state.token,
        user: payload.data,
        msg: payload.msg,
        isAuthenticated: true
      }
    case RESET_STATE:
      return {
        ...state,
        isLoading: false,
        user: null,
        msg: '',
        isAuthenticated: false
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOG_OUT:
      localStorage.removeItem('token')
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null
      }
    default:
      return state
  }
}
