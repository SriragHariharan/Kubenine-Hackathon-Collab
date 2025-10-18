import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    // TODO: Add login API logic here
    console.log('Login Data:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4">
      <div className="bg-black text-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username or Email */}
          <div>
            <label htmlFor="identifier" className="block mb-1 text-sm">Username or Email</label>
            <input
              type="text"
              id="identifier"
              placeholder="Enter username or email"
              {...register('identifier', {
                required: 'Username or email is required'
              })}
              className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none"
            />
            {errors.identifier && (
              <p className="text-red-400 text-sm mt-1">{errors.identifier.message}</p>
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
            className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
