import axios from 'axios'

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      authorization: token
    }
  } else {
    localStorage.removeItem('token')
    delete axios.defaults.headers.authorization
  }
}

export default setAuthToken
