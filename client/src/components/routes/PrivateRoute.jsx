import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    auth: { isAuthenticated, token }
  } = useSelector((state) => {
    return {
      auth: state.auth
    }
  })

  return (
    <Route
      {...rest}
      render={(props) =>
        !token && !isAuthenticated ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
      )}
    />
  )
};

export default React.memo(PrivateRoute)
