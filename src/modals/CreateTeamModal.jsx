import { useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';

const CreateTeamModal = ({ isOpen, onClose, onSubmit }) => {
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
    };

    if (data.members) {
      formattedData.members = data.members
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);
    } else {
      delete formattedData.members;
    }

    onSubmit(formattedData);
    reset(); // Reset form after submission
    onClose(); // Close modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Create a New Team</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Team Name */}
          <div>
            <label htmlFor="name" className="block font-medium text-sm mb-1">Team Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Team name is required' })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Privacy Type */}
          <div>
            <label className="block font-medium text-sm mb-1">Privacy</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="0"
                  {...register('type', { required: true })}
                  className="mr-2"
                />
                Public
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="1"
                  {...register('type', { required: true })}
                  className="mr-2"
                />
                Private
              </label>
            </div>
            {errors.type && <p className="text-red-500 text-sm">Please select a privacy type</p>}
          </div>

          {/* Members */}
          <div>
            <label htmlFor="members" className="block font-medium text-sm mb-1">
              Member IDs (comma-separated)
            </label>
            <input
              type="text"
              id="members"
              placeholder="e.g. user123, user456"
              {...register('members')}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {isSubmitting ? 'Creating...' : 'Create Team'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamModal;
