import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleMarket } from '../../store/action/marketAction';

import GenerateMap from '../containers/GenerateMap';

const DetailsMarket = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = match.params;
  const {
    market: { singleMarket, marketLoading },
  } = useSelector((state) => {
    return {
      market: state.market,
    };
  });

  useEffect(() => {
    dispatch(fetchSingleMarket(id));
  }, [dispatch, id]);

  return marketLoading ? (
    <p className='lead mt-5 text-center'>Loading...</p>
  ) : singleMarket !== null ? (
    <div className='mt-5 container'>
      <button className='btn btn-secondary text-white'>
        <Link to='/'>Back to homepage</Link>
      </button>
      <h1 className='text-capitalize my-4'>{singleMarket.name}</h1>

      <div className='row'>
        <div className='sub-division col-md-6 col-12'>
          <i className='fas fa-map-marker-alt fa-2x mr-3' />
          <span>
            <h4>Address</h4>
            <p>{singleMarket.location.formattedAddress}</p>
          </span>
        </div>
        <div className='col-md-6 col-12'>
          <h4>Description</h4>
          <p>{singleMarket.description}</p>
        </div>
        <div className='row mx-auto'>
          {singleMarket.image.map((image, index) => {
            return (
              <div className='card card-image col-12 col-md-4' key={index}>
                <img src={image.url} alt='' className='img-fluid' />
              </div>
            );
          })}
        </div>
      </div>
      <GenerateMap marketLoaded={[singleMarket]} />
    </div>
  ) : (
    <h1 className='text-capilize my-5 text-center'>
      Oops!, you've made a bad request
    </h1>
  );
};

export default DetailsMarket;
