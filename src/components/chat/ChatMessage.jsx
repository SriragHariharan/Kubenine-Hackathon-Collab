import React from 'react';
import MessageBubble from './MessageBubble';
import { constants } from '../../constants/constants';
import axiosInstance from '../../axios/axios';
import endpoints from '../../constants/endpoints';
import toast from 'react-hot-toast';

const ChatMessages = ({ messages, onPin, onUnpin }) => {
    const myUserID = localStorage.getItem(constants.USER_ID);
    console.log(messages[0])

     const handlePinMessage = (messageId) => {
        console.log(messageId)
        axiosInstance.post(endpoints?.PIN_MESSAGE,{ messageId })
        .then(resp => console.log(resp?.data))
        .catch(err => toast.error("Failed to pin message"));
        }

    const handleUnpinMessage = (messageId) => {
        axiosInstance.post(endpoints?.UNPIN_MESSAGE,{ messageId })
        .then(resp => console.log("unpin response:",resp?.data))
        .catch(err => toast.error("Failed to unpin message"));
    }
    return (
        <div className="space-y-3 px-6">
            {messages?.map((msg) => (
                <MessageBubble
                    key={msg._id || msg.id}
                    messageId={msg?._id || msg?.id}
                    isMine={msg?.u?._id === myUserID}
                    text={msg.msg}
                    sender={msg?.u?.username}
                    isPinned={!!msg.pinned}
                    onPin={handlePinMessage}
                    onUnpin={handleUnpinMessage}
                />
            ))}
        </div>
    );
};

export default ChatMessages;
