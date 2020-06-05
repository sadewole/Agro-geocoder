import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/action/authAction'
import { clearError } from '../../store/action/alertAction'
import Alert from '../containers/Alert'

const Login = ({ history }) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    alert,
    auth: { isAuthenticated, isLoading }
  } = useSelector((state) => {
    return {
      auth: state.auth,
      alert: state.alert
    }
  })

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/view_market')
    }
    return () => {
      dispatch(clearError())
    };
  }, [isAuthenticated, history, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setMessage('Please, ensure fields are not empty')
      return;
    }
    const sendOption = {}
    sendOption.email = email
    sendOption.password = password

    dispatch(login(sendOption))
  };
  return (
    <div className='admin py-5 mt-4 mx-auto'>
      <h1 className='text-center text-uppercase'>Admin Login</h1>
      <form onSubmit={handleSubmit} className='mt-3 form'>
        {message !== '' ? (
          alert.id === 'LOGIN_FAIL' ? (
            <Alert message='Email or Password is incorrect!' type='error' />
          ) : (
            <Alert message={message} type='error' />
          )
        ) : null}
        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            className='form-control'
          />
        </div>
        <button className='btn btn-block btn-secondary' disabled={!!isLoading}>
          Login
        </button>
      </form>
    </div>
  )
};

export default Login
