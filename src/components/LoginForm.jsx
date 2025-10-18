import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { constants } from '../constants/constants';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    setApiError(null);

    axios
      .post(import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/login', data)
      .then((resp) => {
        const { userId, authToken } = resp?.data?.data || {};
        if (userId && authToken) {
          localStorage.setItem(constants.USER_ID, userId);
          localStorage.setItem(constants.AUTH_TOKEN, authToken);
          navigate('/', { replace: true });
        } else {
          setApiError('Login failed. Invalid credentials.');
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.error || 'Something went wrong';
        setApiError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4">
      <div className="bg-black text-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>

        {apiError && (
          <div className="bg-red-500 text-white text-sm p-2 rounded">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username or Email */}
          <div>
            <label htmlFor="user" className="block mb-1 text-sm">Username or Email</label>
            <input
              type="text"
              id="user"
              placeholder="Enter username or email"
              {...register('user', {
                required: 'Username or email is required'
              })}
              className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none"
            />
            {errors.user && (
              <p className="text-red-400 text-sm mt-1">{errors.user.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              {...register('password', {
                required: 'Password is required'
              })}
              className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2 rounded transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
