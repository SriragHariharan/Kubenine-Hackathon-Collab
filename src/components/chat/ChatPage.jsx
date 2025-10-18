import React, { useEffect, useRef, useState, useCallback } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessage";
import ChatInput from "./ChatInput";
import useChannelStore from "../../zustand/useChannelStore";
import useChannelUsers from "../../hooks/useChannelUsers";
import useOnlineMembers from "../../hooks/useOnlineMembers";
import useAllUsers from "../../hooks/useAllUsers";
// import useChatSocket from "../../hooks/useChatSocket";
import useMessages from "../../hooks/useGetMessages";
import { constants } from "../../constants/constants";
import axiosInstance from "../../axios/axios";
import axios from 'axios';
import endpoints from "../../constants/endpoints";
import toast from "react-hot-toast";

const ChatPage = () => {
  const selectedChannel = useChannelStore((state) => state.selectedChannel);
  const [messages, setMessages] = useState([]);
  const [socketStatus, setSocketStatus] = useState("disconnected");
  const socketRef = useRef(null);

  // Get token (AUTH_TOKEN) from localStorage/constants
  const visitorToken = localStorage.getItem(constants?.AUTH_TOKEN);
  const roomId = selectedChannel?.id || "GENERAL";

  // Set up and manage WebSocket connection
  useEffect(() => {
    if (!roomId || !visitorToken) return;
    const ws = new WebSocket("ws://localhost:3000/websocket");
    socketRef.current = ws;

    let connectInterval;
    let isAuthenticated = false;

    ws.onopen = () => {
      setSocketStatus("connected");
      // 1. DDP connect handshake
      ws.send(
        JSON.stringify({
          msg: "connect",
          version: "1",
          support: ["1", "pre2", "pre1"],
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Handle DDP handshake
        if (data.msg === "connected") {
          // Authenticate if not done
          if (visitorToken && !isAuthenticated) {
            const loginMsg = {
              msg: "method",
              method: "login",
              params: [{ resume: visitorToken }],
              id: `login_${Date.now()}`,
            };
            ws.send(JSON.stringify(loginMsg));
          }
        }
        // Respond to keep-alive
        if (data.msg === "ping") {
          ws.send(JSON.stringify({ msg: "pong" }));
        }
        // Check login response
        if (
          data.msg === "result" &&
          data.result &&
          !isAuthenticated &&
          data.id && data.id.startsWith("login_")
        ) {
          isAuthenticated = true;
          // Subscribe to channel after login
          ws.send(
            JSON.stringify({
              msg: "sub",
              id: `sub_${roomId}_${Date.now()}`,
              name: "stream-room-messages",
              params: [roomId, false],
            })
          );
        }
        // Handle incoming chat messages
        if (data.msg === "changed" && data.collection === "stream-room-messages") {
          const newMsg = data.fields?.args?.[0];
          if (newMsg) {
            setMessages((prev) => [...prev, newMsg]);
          }
        }
      } catch (error) {
        // Optionally console.error here
      }
    };

    ws.onerror = () => {
      setSocketStatus("error");
    };
    ws.onclose = () => {
      setSocketStatus("disconnected");
    };

    return () => {
      ws.close();
      clearInterval(connectInterval);
    };
  }, [roomId, visitorToken]);

  // Send message via WebSocket
  const handleSendMessage = useCallback(
    (text) => {
      if (!socketRef.current || socketStatus !== "connected" || !roomId || !visitorToken) return;
      const messageId = `msg_${Date.now()}`;
      const msgBody = {
        msg: "method",
        method: "sendMessage",
        id: messageId,
        params: [
          {
            _id: messageId,
            rid: roomId,
            msg: text,
          },
        ],
      };
      socketRef.current.send(JSON.stringify(msgBody));
    },
    [roomId, visitorToken, socketStatus]
  );

  // Pull initial history on channel change (fallback)
  useEffect(() => {
    if (!roomId) return;
    // Use your axios instance (assumed imported) instead of fetch or plain axios
    axiosInstance.get(`/api/v1/channels.history?roomId=${roomId}`, {
      headers: {
        'X-Auth-Token': visitorToken,
        'X-User-Id': localStorage.getItem(constants.USER_ID),
      },
    })
      .then((res) => {
        if (Array.isArray(res.data.messages)) setMessages(res.data.messages.reverse()); // Rocket.Chat returns newest first
      });
  }, [roomId, visitorToken]);

  // get selected channels
    const { channelUsers, loading, error } = useChannelUsers(selectedChannel?.id);

    //TODO: get online users
    const { onlineMembers } = useOnlineMembers(selectedChannel?.id);
    // console.log(onlineMembers, ": online users")

    //get all users
    const { allUsers } = useAllUsers();
    console.log("All users:", allUsers)
  // Example users data
  const [users, setUsers] = useState([
    { id: "1", name: "Alice", active: true },
    { id: "2", name: "Bob", active: false },
    { id: "3", name: "Charlie", active: true },
    // Add more users as needed
  ]);
  
  const [addedUserIds, setAddedUserIds] = useState([]);

  useEffect(() => {
    const initialIds = channelUsers.map((m) => m._id);
    setAddedUserIds(initialIds);
  }, [channelUsers]);

  const handleAddUser = (userId) => {
    setAddedUserIds((prev) => [...prev, userId]);
  };

  const handleRemoveUser = (userId) => {
    setAddedUserIds((prev) => prev.filter((id) => id !== userId));
  };
  //TODO: Handle pin messages
 

  const handleUnpinMessage = useCallback(
    async (messageId) => {
      try {
        const resp = await axiosInstance.post(endpoints?.UNPIN_MESSAGE,{ messageId });
        console.log("resp",resp?.data)
      } catch (err) {
        alert('Unpin failed: ' + err.message);
      }
    },
    []
  );


  return (
    <div className="flex flex-col h-[89vh] bg-gray-50">
      <ChatHeader
        channelName={selectedChannel?.name}
        totalMembers={channelUsers}
        onlineMembers={onlineMembers?.length}
        users={allUsers}
        addedUserIds={addedUserIds}
        onAddUser={handleAddUser}
        onRemoveUser={handleRemoveUser}
      />

      <div className="flex-1 overflow-y-scroll py-2">
        <ChatMessages 
          messages={messages} 
          // onPin={handlePinMessage} 
          onUnpin={handleUnpinMessage} 
        />
      </div>

      <div className="border-t px-4 py-3 bg-white">
        {/* Pass handleSendMessage to ChatInput */}
        <ChatInput channelDetails={selectedChannel} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
