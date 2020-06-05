import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/action/authAction';
import { useDispatch } from 'react-redux';

const Nav = () => {
  const dispatch = useDispatch();
  return (
    <ul className='container mx-auto navbar justify-between list-unstyled'>
      <li className='nav-item'>
        <NavLink to='/view_market'>View Market</NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/create_market'>Post Market</NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/login' onClick={() => dispatch(logout())}>
          Logout
        </NavLink>
      </li>
    </ul>
  );
};

export default Nav;
