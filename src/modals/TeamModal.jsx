const statusStyles = {
  active: 'bg-green-100 text-green-800',
  dnd: 'bg-red-100 text-red-800',
  away: 'bg-yellow-100 text-yellow-800',
};

const TeamModal = ({ isOpen, onClose, teamName, members }) => {
  if (!isOpen) return null;

  const handleContentClick = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="team-modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
        onClick={handleContentClick}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="team-modal-title" className="text-xl font-semibold">
            {teamName} Members
          </h2>
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

        <ul className="space-y-4">
          {members.map(({ id, name, avatarUrl, status }) => (
            <li key={id} className="flex items-center space-x-4">
              <img
                src={avatarUrl}
                alt={name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{name}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamModal;
