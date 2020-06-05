import React, { useEffect } from 'react'
import Nav from '../containers/Nav'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMarket, deleteMarket } from '../../store/action/marketAction'
import { Link } from 'react-router-dom'

const Market = () => {
  const dispatch = useDispatch()
  const {
    market: { marketLoaded, marketLoading }
  } = useSelector((state) => {
    return {
      error: state.error,
      market: state.market
    }
  })

  useEffect(() => {
    dispatch(fetchMarket())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteMarket(id))
  };

  return (
    <div className='admin py-5 mt-4 mx-auto'>
      <Nav />
      <div>
        <h1>Registered Market(s)</h1>
        <ul className='list-group list-unstyled my-3'>
          {marketLoading ? (
            <li className='text-center mt-3'>
              <h3>
                <em>Loading...</em>
              </h3>
            </li>
          ) : marketLoaded.length < 1 ? (
            <li className='list-group-item text-center mt-3'>
              No market is added yet.
            </li>
          ) : (
            marketLoaded.map((market) => {
              return (
                <li
                  className='list-group-item d-flex justify-content-between align-items-center'
                  key={market._id}
                >
                  {market.name}
                  <span
                    className='btn badge badge-danger badge-pill'
                    onClick={() => handleDelete(market._id)}
                  >
                    {market.deleting ? (
                      <Link to='#'>Delete...</Link>
                    ) : (
                      <Link to='#'>
                        <em>Delete</em>
                      </Link>
                    )}
                  </span>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
};

export default Market
