import React from 'react';
import { useForm } from 'react-hook-form';
import { constants } from '../constants/constants';
import axiosInstance from '../axios/axios';
import endpoints from '../constants/endpoints';
import toast from 'react-hot-toast';

const CreateTeam = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleFormSubmit = (data) => {
    const formattedData = {
      ...data,
      type: parseInt(data.type),
      members: [localStorage.getItem(constants.USER_ID)],
      room: { readonly: false }
    };

    console.log(formattedData)
    // API: Create New Team
    axiosInstance.post(endpoints.CREATE_NEW_TEAM, formattedData)
      .then((resp) => {
        console.log(resp)
        toast.success("Team created successfully")
        reset();
      })
      .catch((err) => {
        console.error('❌ Error:', err);
        toast.error("Failed to create team");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Create New Team</h1>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Team Name */}
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Team Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter team name"
              {...register('name', { required: 'Team name is required' })}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-black/20"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Privacy Type */}
          <div>
            <label className="block font-medium mb-1">
              Privacy <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="0"
                  {...register('type', { required: true })}
                />
                <span>Public</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="1"
                  {...register('type', { required: true })}
                />
                <span>Private</span>
              </label>
            </div>
            {errors.type && <p className="text-red-500 text-sm mt-1">Please select a type</p>}
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition w-full sm:w-auto cursor-pointer"
          >
            {isSubmitting ? 'Creating...' : 'Create Team'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
