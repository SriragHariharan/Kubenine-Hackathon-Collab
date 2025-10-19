import React from 'react';
import { XMarkIcon, CheckIcon, MinusIcon } from '@heroicons/react/24/outline';

const ChatUserModal = ({ users, onClose, onAddUser, onRemoveUser, addedUserIds }) => {
    console.log("first user dets",users[0])
  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Manage Users</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {users?.length === 0 && <p>No users available.</p>}
          {users?.map(user => {
            const isAdded = addedUserIds.includes(user._id);
            return (
              <div
                key={user._id}
                className="flex items-center justify-between py-2 border-b last:border-none"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      user.active ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                    title={user.active ? 'Active' : 'Inactive'}
                  />
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={() =>
                    isAdded ? onRemoveUser(user._id) : onAddUser(user._id)
                  }
                  className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium ${
                    isAdded
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <MinusIcon className="h-4 w-4" />
                      Remove
                    </>
                  ) : (
                    <>
                      <CheckIcon className="h-4 w-4" />
                      Add
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatUserModal;
