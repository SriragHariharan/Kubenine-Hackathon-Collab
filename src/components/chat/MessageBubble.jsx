import React, { useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import useTodoStore from '../../zustand/useTodoStore'; // ✅ Make sure to import this

const MessageBubble = ({ isMine, text, sender, isPinned, onPin, onUnpin, messageId, onReply }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isTodo, setIsTodo] = useState(false);

  const addTodo = useTodoStore((state) => state.addTodo);

  // ✅ Add message to todo list
  const handleAddMessageToTodo = () => {
    addTodo(text);
    setIsTodo(true); // Optional: visually mark it as todo
    setShowOptions(false);
  };

  const side = isMine ? 'right' : 'left';
  const bubbleBg = isMine ? 'bg-green-500 text-white' : 'bg-white text-gray-800';

  return (
    <div className={`flex items-start relative group ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-lg shadow ${bubbleBg}`}>
        {!isMine && <div className="text-xs text-gray-500 mb-1 capitalize">{sender}</div>}
        <p className="text-sm">{text}</p>
        {isPinned && (
          <div className="text-[10px] text-yellow-400 mt-1">📌 Pinned</div>
        )}
        {isTodo && (
          <div className="text-[10px] text-blue-500 mt-1">✅ Todo</div>
        )}
      </div>

      {/* Options button */}
      <div
        className={`absolute top-1 ${isMine ? '-right-6' : '-left-6'} group-hover:flex hidden`}
      >
        <button
          onClick={() => setShowOptions((prev) => !prev)}
          className="text-gray-400 hover:text-black p-1"
        >
          <EllipsisVerticalIcon className="h-5 w-5" />
        </button>

        {/* Options dropdown */}
        {showOptions && (
          <div
            className={`absolute top-0 z-10 w-40 text-sm border rounded shadow-md bg-white ${
              isMine ? 'right-6' : 'left-6'
            }`}
          >
            <button
              onClick={() => {
                onPin(messageId);
                setShowOptions(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {isPinned ? 'Unpin' : 'Pin'}
            </button>

            <button
              onClick={handleAddMessageToTodo}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {isTodo ? 'Remove Todo' : 'Add as Todo'}
            </button>

            {/* <button
              onClick={handleReply}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Reply
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
