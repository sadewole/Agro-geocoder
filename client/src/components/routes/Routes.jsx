import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import AddMarket from '../pages/AddMarket'
import Market from '../pages/Market'
import DetailsMarket from '../pages/DetailsMarket'
import PrivateRoute from './PrivateRoute'

const Routers = () => {
  return (
    <section>
      <Switch>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/create_market' component={AddMarket} />
        <PrivateRoute exact path='/view_market' component={Market} />
        <Route exact path='/details/:id' component={DetailsMarket} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
};

export default Routers
