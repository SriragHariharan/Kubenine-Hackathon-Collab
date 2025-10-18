import React, { useState } from 'react';
import { PaperAirplaneIcon, PhotoIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../../axios/axios';
import endpoints from '../../constants/endpoints';

const ChatInput = ({ channelDetails, onSendMessage }) => {
  const [message, setMessage] = useState('');
  console.log("channel details:", channelDetails)

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // If onSendMessage is provided, use it
    if (typeof onSendMessage === 'function') {
      onSendMessage(message);
      setMessage('');
      return;
    }
    // Fallback: axios API (legacy)
    axiosInstance.post(endpoints.SEND_MESSAGE, { channel: channelDetails?.id, text: message })
      .then(resp => console.log(resp?.data))
      .catch(err => console.error(err));
    setMessage('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('📸 Selected image:', file.name);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Upload image */}
      <label className="cursor-pointer">
        <PhotoIcon className="h-6 w-6 text-gray-500 hover:text-gray-800" />
        <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
      </label>

      {/* Text input */}
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-black/10"
      />

      {/* Send button */}
      <button
        onClick={handleSendMessage}
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-1"
      >
        <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
        <span className="hidden sm:inline">Send</span>
      </button>
    </div>
  );
};

export default ChatInput;
