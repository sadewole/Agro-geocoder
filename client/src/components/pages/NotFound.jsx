import React from 'react';

const NotFound = ({ location }) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-10 mx-auto text-center text-capitalize text uppercase pt-5'>
          <h1 className='display-3'>404</h1>
          <h1>error</h1>
          <h2>Page not found</h2>
          <h3>
            the requested URL
            <span className='text-danger'>{location.pathname}</span> was not
            found.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
