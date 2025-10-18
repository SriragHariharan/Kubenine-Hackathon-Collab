import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessage";
import ChatInput from "./ChatInput";
import useChannelStore from "../../zustand/useChannelStore";
import useChannelUsers from "../../hooks/useChannelUsers";
import useOnlineMembers from "../../hooks/useOnlineMembers";
import useAllUsers from "../../hooks/useAllUsers";

const ChatPage = () => {
    // get selected channels
    const selectedChannel = useChannelStore((state) => state.selectedChannel);
    console.log("selected channel:", selectedChannel)
  
    //get all the users in the channel
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

      <div className="flex-1 overflow-y-auto px-4 py-2">
        <ChatMessages />
      </div>

      <div className="border-t px-4 py-3 bg-white">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatPage;
