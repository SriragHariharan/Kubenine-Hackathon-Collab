import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessage";
import ChatInput from "./ChatInput";
import useChannelStore from "../../zustand/useChannelStore";

const ChatPage = () => {
  const totalMembers = 10;
  const onlineMembers = 6;
  const channelName = "general";

  // Example users data
  const [users, setUsers] = useState([
    { id: "1", name: "Alice", active: true },
    { id: "2", name: "Bob", active: false },
    { id: "3", name: "Charlie", active: true },
    // Add more users as needed
  ]);

  // Users currently added to the channel
  const [addedUserIds, setAddedUserIds] = useState(["1"]);

  const handleAddUser = (userId) => {
    setAddedUserIds((prev) => [...prev, userId]);
  };

  const handleRemoveUser = (userId) => {
    setAddedUserIds((prev) => prev.filter((id) => id !== userId));
  };

  // get selected channels
  const selectedChannel = useChannelStore((state) => state.selectedChannel);
  console.log("selected channel:", selectedChannel)

  return (
    <div className="flex flex-col h-[89vh] bg-gray-50">
      <ChatHeader
        channelName={selectedChannel?.name}
        totalMembers={totalMembers}
        onlineMembers={onlineMembers}
        users={users}
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
