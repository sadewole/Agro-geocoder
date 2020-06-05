import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SearchMarket = () => {
  const {
    market: { filterMarket }
  } = useSelector((state) => {
    return {
      market: state.market
    }
  })
  return (
    <>
      <ul className='list-unstyled list-group list-group-flush container'>
        {filterMarket &&
          filterMarket.map((market) => {
            return (
              <li key={market._id} className='list-group-item'>
                <Link to={`/details/${market._id}`}>{market.name}</Link>
              </li>
            )
          })}
      </ul>
    </>
  )
};

export default SearchMarket
