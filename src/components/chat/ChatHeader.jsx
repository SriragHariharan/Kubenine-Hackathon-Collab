import React, { useState } from 'react';
import { PlusIcon, UserGroupIcon, SignalIcon, PaperClipIcon  } from '@heroicons/react/24/outline';
import ChatUserModal from './ChatUserModal';
import axiosInstance from '../../axios/axios';
import endpoints from '../../constants/endpoints';
import { useParams } from 'react-router-dom';
import useChannelStore from '../../zustand/useChannelStore';
import toast from 'react-hot-toast';
import PinnedMessagesModal from '../../modals/PinnedMessagesModal';

const ChatHeader = ({
  channelName,
  totalMembers,
  onlineMembers,
  users,
  addedUserIds,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const handlePlusClick = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  console.log("total members: ",totalMembers);

  const channelID = useChannelStore((state) => state.selectedChannel?.id);

  const handleAdUserToGroup = (userId, roomId, ) => {
    console.log(userId, roomId);
    axiosInstance.post(endpoints?.ADD_USER_TO_GROUP, { roomId: channelID, userId })
    .then(resp => toast.success("user added sucessfully"))
    .catch(err => toast.error("Unable to add user to the group."));
  };

  const handleRemoveUserFromGroup = (userId) => {
    axiosInstance.post(endpoints?.REMOVE_USER_FROM_GROUP, { roomId: channelID, userId })
    .then(resp => toast.success("user removed sucessfully"))
    .catch(err => toast.error("Unable to remove user from the group."));
  };

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
        <button
            className="bg-white border text-gray-600 p-2 rounded hover:bg-gray-100 transition"
              onClick={() => setIsPinModalOpen(true)}
            aria-label="View pinned messages"
        >
  <PaperClipIcon className="h-5 w-5" />
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
          onAddUser={handleAdUserToGroup}
          onRemoveUser={handleRemoveUserFromGroup}
          addedUserIds={addedUserIds}
        />
      )}

      {
        isPinModalOpen && (
          <PinnedMessagesModal roomId={channelID} onClose={() => setIsPinModalOpen(false)} />
        )
      }
    </>
  );
};

export default ChatHeader;
