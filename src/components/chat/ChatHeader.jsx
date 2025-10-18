import React, { useState } from 'react';
import { PlusIcon, UserGroupIcon, SignalIcon } from '@heroicons/react/24/outline';
import ChatUserModal from './ChatUserModal';

const ChatHeader = ({
  channelName,
  totalMembers,
  onlineMembers,
  users,
  addedUserIds,
  onAddUser,
  onRemoveUser,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlusClick = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  console.log("total members: ",totalMembers);

  return (
    <>
      <div className="bg-white shadow px-4 py-4 md:px-8 flex justify-between items-center border-b">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          #{channelName}
        </h1>
        <div className="flex items-center gap-4">
          <button
            className="bg-black text-white p-2 rounded hover:bg-gray-800 transition"
            onClick={handlePlusClick}
            aria-label="Add user"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
          <div className="hidden sm:flex items-center text-sm text-gray-700">
            <UserGroupIcon className="h-5 w-5 mr-1" />
            {totalMembers?.length || 0} Members
          </div>
          <div className="flex items-center text-sm text-green-600">
            <SignalIcon className="h-5 w-5 mr-1 text-green-500" />
            {onlineMembers} Online
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ChatUserModal
          users={users}
          onClose={handleClose}
          onAddUser={onAddUser}
          onRemoveUser={onRemoveUser}
          addedUserIds={addedUserIds}
        />
      )}
    </>
  );
};

export default ChatHeader;
