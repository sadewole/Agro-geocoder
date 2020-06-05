import {
  FETCH_MARKET,
  ADD_MARKET,
  DELETE_MARKET,
  FETCH_MARKET_ERROR,
  ADD_MARKET_ERROR,
  DELETE_MARKET_ERROR,
  LOAD_REQUEST,
  DELETE_MARKET_REQUEST,
  FILTER_MARKET,
  FETCH_SINGLE_MARKET,
  FETCH_SINGLE_MARKET_ERROR
} from '../action/types'

const initState = {
  marketLoading: false,
  marketLoaded: [],
  filterMarket: null,
  singleMarket: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_REQUEST:
      return {
        ...state,
        marketLoading: true
      }
    case FETCH_MARKET:
      return {
        ...state,
        marketLoading: false,
        marketLoaded: action.payload.data
      }
    case ADD_MARKET:
      return {
        ...state,
        marketLoading: false,
        marketLoaded: [...state.marketLoaded, action.payload.data]
      }
    case DELETE_MARKET_REQUEST:
      return {
        ...state,
        marketLoaded: state.marketLoaded.map(mark => mark._id === action.payload ? {
          ...mark,
          deleting: true
        } : mark)
      }
    case DELETE_MARKET:
      return {
        ...state,
        marketLoading: false,
        marketLoaded: state.marketLoaded.filter(
          (item) => item._id !== action.payload
        )
      }
    case FETCH_MARKET_ERROR:
    case ADD_MARKET_ERROR:
    case FETCH_SINGLE_MARKET_ERROR:
      return {
        ...state,
        marketLoading: false
      }
    case DELETE_MARKET_ERROR:
      // remove 'deleting:true' property and add 'deleteError:[error]' property
      return {
        ...state,
        marketLoading: false,
        marketLoaded: state.marketLoaded.map(mark => {
          if (mark._id === action.payload) {
            return (mark.deleting = false)
          }
          return mark
        })
      }
    case FILTER_MARKET:
      return {
        ...state,
        filterMarket: state.marketLoaded.filter(search => {
          return search.name.toLowerCase().match(action.payload.toLowerCase())
        })
      }
    case FETCH_SINGLE_MARKET:
      return {
        ...state,
        marketLoading: false,
        singleMarket: action.payload.data
      }
    default:
      return state
  }
}
