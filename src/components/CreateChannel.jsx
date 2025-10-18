import React from 'react';
import { useForm } from 'react-hook-form';
import { constants } from '../constants/constants';
import axiosInstance from '../axios/axios';
import endpoints from '../constants/endpoints';
import toast from 'react-hot-toast';
import useChannelStore from '../zustand/useChannelStore';

const CreateChannel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const addChannel = useChannelStore((state) => state.addChannel);

  const handleFormSubmit = (data) => {
    const formattedData = {
      ...data,
      members: [localStorage.getItem(constants.USER_ID)],
      readonly: false 
    };

    console.log(formattedData)
    // API: Create New Channel
    axiosInstance.post(endpoints.CREATE_NEW_CHANNEL, formattedData)
      .then((resp) => {
        addChannel(resp?.data?.channel)
        toast.success("Channel created successfully")
        reset();
      })
      .catch((err) => {
        console.error('❌ Error:', err);
        toast.error("Failed to create channel");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Create New Channel</h1>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Channel Name */}
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Channel <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter channel name"
              {...register('name', { required: 'Channel name is required' })}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-black/20"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition w-full sm:w-auto cursor-pointer"
          >
            {isSubmitting ? 'Creating...' : 'Create Channel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
