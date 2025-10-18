import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../axios/axios';
import endpoints from '../constants/endpoints';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    setError(null);
    console.log('Form data:', data);

    axios
      .post('http://localhost:3000/api/v1/users.register', data)
      .then((resp) => {
        console.log('✅ Response:', resp.data);
        navigate('/login', { replace: true });
      })
      .catch((err) => {
        setError(err?.response?.data?.error);
        console.error('❌ Error:', err?.response?.data?.error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4">
      <div className="bg-black text-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {/* ✅ Show Error */}
        {error && (
          <div className="bg-red-600 text-white text-sm p-3 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-1 text-sm">Username</label>
            <input
              type="text"
              id="username"
              placeholder="rogersmith"
              {...register('username', { required: 'Username is required' })}
              className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none"
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              id="email"
              placeholder="roger@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email',
                },
              })}
              className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="pass" className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              id="pass"
              placeholder="********"
              {...register('pass', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none"
            />
            {errors.pass && (
              <p className="text-red-400 text-sm mt-1">{errors.pass.message}</p>
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
