import axios from 'axios'
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_REGISTER,
  AUTH_ERROR,
  AUTH_LOGIN,
  CLEAR_ERROR,
  RESET_STATE,
  LOG_OUT
} from './types'
import {
  returnError
} from './alertAction'

// const url = 'http://localhost:5000'
// const url = 'https://agro-mall-market.herokuapp.com'

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOADING
    })

    const res = await axios.get('/api/v1/auth/secret')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })

    dispatch({
      type: CLEAR_ERROR
    })
  } catch (err) {
    console.log(err)
    dispatch(
      returnError(err.response.status, err.response.data, 'LOAD_USER_FAIL')
    )
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const register = data => async dispatch => {
  try {
    dispatch({
      type: USER_LOADING
    })
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    // body
    const body = JSON.stringify(data)

    const res = await axios.post('/api/v1/auth/signup', body, config)
    dispatch({
      type: AUTH_REGISTER,
      payload: res.data
    })

    dispatch({
      type: CLEAR_ERROR
    })

    dispatch(loadUser())
  } catch (err) {
    dispatch(
      returnError(err.response.status, err.response.data, 'REGISTER_FAIL')
    )
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const login = data => async dispatch => {
  try {
    dispatch({
      type: USER_LOADING
    })
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    // body
    const body = JSON.stringify(data)

    const res = await axios.post('/api/v1/auth/signin', body, config)

    dispatch({
      type: AUTH_LOGIN,
      payload: res.data
    })
    dispatch({
      type: CLEAR_ERROR
    })
    dispatch(loadUser())
  } catch (err) {
    dispatch(returnError(err.response.status, err.response.data, 'LOGIN_FAIL'))
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: LOG_OUT,
    payload: {
      msg: 'Logged out successfully'
    }
  })
}

export const resetState = () => dispatch => {
  dispatch({
    type: RESET_STATE
  })
}
