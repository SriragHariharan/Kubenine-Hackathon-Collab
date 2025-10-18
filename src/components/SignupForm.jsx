import React from 'react';
import { useForm } from 'react-hook-form';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // submission logic can be added later
    console.log('Form data:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4">
      <div className="bg-black text-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Roger Smith"
              {...register('name')}
              className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none"
            />
          </div>

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

          {/* Secret URL (optional) */}
          {/* <div>
            <label htmlFor="secretURL" className="block mb-1 text-sm">Secret URL (optional)</label>
            <input
              type="text"
              id="secretURL"
              placeholder="Jjwjg6gouWLXhMGKW"
              {...register('secretURL')}
              className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none"
            />
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
