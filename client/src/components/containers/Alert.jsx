import React from 'react'

const Alert = ({ message, type }) => (
  <div
    className={`alert btn-block p-2 alert-${
      type === 'error' ? 'danger' : 'success'
    }`}
  >
    {message}
  </div>
)

export default Alert
