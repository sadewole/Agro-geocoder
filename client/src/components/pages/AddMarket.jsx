// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMarket } from '../../store/action/marketAction';
import Nav from '../containers/Nav';
import Alert from '../containers/Alert';

const AddMarket = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();

  const {
    alert,
    market: { marketLoading },
  } = useSelector((state) => {
    return {
      alert: state.alert,
      market: state.market,
    };
  });

  useEffect(() => {
    if (alert.msg !== null) {
      setMessage(alert.msg);
    }
  }, [setMessage, alert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !description || !image1 || !image2 || !image3) {
      setMessage('Please, ensure fields are not empty');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('images', image1);
    formData.append('images', image2);
    formData.append('images', image3);

    formData.getAll('images');
    dispatch(addMarket(formData));
  };

  return (
    <div className='admin py-5 mt-4 mx-auto'>
      <Nav />
      <h1>Add New Market</h1>

      {message !== '' ? (
        alert.msg !== null ? (
          <Alert
            message={message}
            type={alert.id === 'ADD_MARKET_SUCESS' ? 'success' : 'error'}
          />
        ) : (
          <Alert message={message} type='error' />
        )
      ) : null}
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Market Name</label>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Market Address</label>
          <input
            type='text'
            onChange={(e) => setAddress(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Market Description</label>
          <textarea
            name='description'
            className='form-control'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className=''>
          <span className='d-flex align-items-center'>
            <h4>Upload Image</h4>
            <small>(atleast 3 images of the market)</small>
          </span>
          <div>
            <input
              type='file'
              onChange={(e) => setImage1(e.target.files[0])}
              className='form-control mb-2'
            />
            <input
              type='file'
              onChange={(e) => setImage2(e.target.files[0])}
              className='form-control mb-2'
            />
            <input
              type='file'
              onChange={(e) => setImage3(e.target.files[0])}
              className='form-control mb-2'
            />
          </div>
        </div>

        <button
          className='btn btn-block btn-secondary text-uppercase'
          disabled={!!marketLoading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMarket;
