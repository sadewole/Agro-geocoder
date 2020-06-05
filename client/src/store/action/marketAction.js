import axios from 'axios'
import {
  FETCH_MARKET,
  ADD_MARKET,
  DELETE_MARKET,
  LOAD_REQUEST,
  FETCH_MARKET_ERROR,
  ADD_MARKET_ERROR,
  DELETE_MARKET_ERROR,
  DELETE_MARKET_REQUEST,
  FILTER_MARKET,
  FETCH_SINGLE_MARKET,
  FETCH_SINGLE_MARKET_ERROR
} from './types'
import {
  returnError,
  returnSuccess
} from './alertAction'

// const url = 'https://agro-mall-market.herokuapp.com'
// const url = 'http://localhost:5000'

export const fetchMarket = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_REQUEST
    })
    const res = await axios.get('/api/v1/market')

    dispatch({
      type: FETCH_MARKET,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: FETCH_MARKET_ERROR
    })
    dispatch(
      returnError(err.response.status, err.response.data, 'FETCH_MARKET_ERROR')
    )
  }
}

export const addMarket = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('/api/v1/market', data, config)
    dispatch({
      type: ADD_MARKET,
      payload: res.data
    })
    dispatch(returnSuccess(res.status, res.data, 'ADD_MARKET_SUCESS'))
  } catch (err) {
    dispatch({
      type: ADD_MARKET_ERROR
    })
    dispatch(
      returnError(err.response.status, err.response.data, 'ADD_MARKET_ERROR')
    )
  }
}

export const fetchSingleMarket = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_REQUEST
    })
    const res = await axios.get(`/api/v1/market/${id}`)
    dispatch({
      type: FETCH_SINGLE_MARKET,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
    dispatch(
      returnError(err.response.status, err.response.data, 'FETCH_SINGLE_MARKET_ERROR')
    )
    dispatch({
      type: FETCH_SINGLE_MARKET_ERROR
    })
  }
}

export const filterMarket = (name) => (dispatch) => {
  dispatch({
    type: FILTER_MARKET,
    payload: name
  })
}

export const deleteMarket = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_MARKET_REQUEST,
      payload: id
    })
    await axios.delete(`/api/v1/market/${id}`)

    dispatch({
      type: DELETE_MARKET,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: DELETE_MARKET_ERROR,
      payload: id
    })
    dispatch(
      returnError(err.response.status, err.response.data, 'DELETE_MARKET_ERROR')
    )
  }
}