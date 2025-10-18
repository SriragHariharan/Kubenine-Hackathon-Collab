import React, { useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const MessageBubble = ({ isMine, text, sender, onReply }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isTodo, setIsTodo] = useState(false);

  const togglePin = () => setIsPinned(prev => !prev);
  const toggleTodo = () => setIsTodo(prev => !prev);
  const handleReply = () => {
    setShowOptions(false);
    if (onReply) onReply({ text, sender });
  };

  return (
    <div className={`flex items-start relative group ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow
        ${isMine ? 'bg-green-500 text-white' : 'bg-white text-gray-800'}
      `}>
        {!isMine && (
          <div className="text-xs text-gray-500 mb-1 capitalize">{sender}</div>
        )}
        <p className="text-sm">{text}</p>
        {isPinned && (
          <div className="text-[10px] text-yellow-400 mt-1">📌 Pinned</div>
        )}
        {isTodo && (
          <div className="text-[10px] text-blue-500 mt-1">✅ Todo</div>
        )}
      </div>

      {/* Options button */}
      <div className="absolute top-1 -right-6 group-hover:flex hidden">
        <button
          onClick={() => setShowOptions(prev => !prev)}
          className="text-gray-400 hover:text-black p-1"
        >
          <EllipsisVerticalIcon className="h-5 w-5" />
        </button>

        {/* Options dropdown */}
        {showOptions && (
          <div className="absolute right-6 top-0 bg-white shadow-md border rounded w-40 z-10 text-sm">
            <button
              onClick={() => {
                togglePin();
                setShowOptions(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {isPinned ? 'Unpin' : 'Pin'}
            </button>
            <button
              onClick={() => {
                toggleTodo();
                setShowOptions(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {isTodo ? 'Remove Todo' : 'Add as Todo'}
            </button>
            <button
              onClick={handleReply}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
