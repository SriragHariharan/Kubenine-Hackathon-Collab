import React from 'react';
import MessageBubble from './MessageBubble';
import { constants } from '../../constants/constants';

const ChatMessages = ({ messages }) => {
    const myUserID = localStorage.getItem(constants.USER_ID);
    return (
        <div className="space-y-3">
            {messages?.map((msg) => (
                <MessageBubble
                    key={msg.id}
                    isMine={msg?.u?._id === myUserID}
                    text={msg.msg}
                    sender={msg?.u?.username}
                />
            ))}
        </div>
    );
};

export default ChatMessages;
