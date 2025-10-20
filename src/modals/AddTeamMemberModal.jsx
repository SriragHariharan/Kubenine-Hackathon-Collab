const statusStyles = {
  online: 'bg-green-100 text-green-800',
  dnd: 'bg-red-100 text-red-800',
  away: 'bg-yellow-100 text-yellow-800',
  offline: 'bg-gray-100 text-gray-800',
};

const AddTeamMemberModal = ({
  isOpen,
  onClose,
  teamName,
  allUsers = [],
  addedUserIds = [],
  onAddUser,
  onRemoveUser,
}) => {
  if (!isOpen) return null;

  const handleContentClick = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 max-h-[80vh] overflow-y-auto"
        onClick={handleContentClick}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{teamName} Members</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User List */}
        <ul className="space-y-4">
          {allUsers.map((user) => {
            const isAdded = addedUserIds.includes(user._id);
            const status = user.status || 'offline';

            return (
              <li key={user._id} className="flex items-center space-x-4">
                <img
                  src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username}`}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium capitalize">{user.username}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {status}
                  </span>
                </div>
                <button
                  onClick={() =>
                    isAdded ? onRemoveUser(user._id) : onAddUser(user._id)
                  }
                  className={`text-sm px-3 py-1 rounded ${
                    isAdded
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {isAdded ? 'Remove' : 'Add'}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AddTeamMemberModal;
