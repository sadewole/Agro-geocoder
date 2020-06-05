import React, { useState, useEffect } from 'react';
import GenerateMap from '../containers/GenerateMap.jsx';
import SearchMarket from '../containers/SearchMarket';
import { fetchMarket } from '../../store/action/marketAction';
import { useSelector, useDispatch } from 'react-redux';
import { filterMarket } from '../../store/action/marketAction.js';

const LandingPage = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const {
    market: { marketLoaded },
  } = useSelector((state) => {
    return {
      error: state.error,
      market: state.market,
    };
  });

  useEffect(() => {
    dispatch(fetchMarket());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      return;
    }
    dispatch(filterMarket(name));
  };

  return (
    <div className='container my-3 mx-auto'>
      <h1 className='display-4 text-center'>
        <i className='fas fa-map-marked mr-4' />
        Market Locator
      </h1>

      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by market name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className='btn btn-secondary btn-block text-uppercase'>
          Search
        </button>
      </form>
      {/** Search result will be genearted here */}
      <SearchMarket />
      <GenerateMap marketLoaded={marketLoaded} />
    </div>
  );
};

export default LandingPage;
