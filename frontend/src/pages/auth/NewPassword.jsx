import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../Common/api';

const NewPassword = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const location = useLocation();
  const [token, setToken] = useState('');
  const navigate=useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      setToken(token);
    } else {
      console.error('Token not found');
    }
  }, [location]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.put(`${URL}/auth/changePassword`, {
        newPassword: data.newPassword,
        oldPassword:data.newPassword,
        param: token,  
      });
      console.log('Password reset successful:', response.data);
      if(response.data.success){
        navigate('/login')
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/2 flex items-center justify-center h-screen">
        <img src={forgotImg} className="w-2/3" alt="" />
      </div>
      <div className="flex items-center w-1/2 flex-col justify-center">
        <h1 className="text-3xl font-semibold">Enter your New Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-3/4">
         
          <div className="flex flex-col mb-4">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              {...register('newPassword', { required: 'New password is required' })}
              className="input input-bordered"
            />
            {errors.newPassword && <span className="text-red-500">{errors.newPassword.message}</span>}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
                validate: (value) =>
                  value === watch('newPassword') || 'Passwords do not match',
              })}
              className="input input-bordered"
            />
            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
          </div>
          <button
            type="submit"
            className="border border-orange-400 text-white px-8 py-2 rounded-md bg-orange-500 hover:bg-orange-400 hover:text-white transition duration-300 ease-in-out mt-10 mb-5"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
