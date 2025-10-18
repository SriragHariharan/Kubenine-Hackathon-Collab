import React from 'react';
import MessageBubble from './MessageBubble';

const dummyMessages = [
  { id: 1, sender: 'me', text: 'Hey, are we ready to deploy?' },
  { id: 2, sender: 'alice', text: 'Yes, just finalizing the docs.' },
  { id: 3, sender: 'me', text: 'Cool, ping me when done.' },
  { id: 4, sender: 'bob', text: 'Deployment starts in 5 minutes.' }
];

const ChatMessages = () => {
  return (
    <div className="space-y-3">
      {dummyMessages.map((msg) => (
        <MessageBubble
          key={msg.id}
          isMine={msg.sender === 'me'}
          text={msg.text}
          sender={msg.sender}
        />
      ))}
    </div>
  );
};

export default ChatMessages;
