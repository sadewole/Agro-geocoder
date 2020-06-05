import React, { useEffect } from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import Routes from './components/routes/Routes'
import { loadUser } from './store/action/authAction'
import setAuthToken from './components/utils/setAuthToken'
import store from './store/store'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// set auth with token
setAuthToken(localStorage.token)
// load user on mount
function App () {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Router>
      <>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route component={Routes} />
        </Switch>
      </>
    </Router>
  )
}

export default App
