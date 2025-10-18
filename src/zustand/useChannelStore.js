// src/stores/useChannelStore.js
import { create } from 'zustand';

const useChannelStore = create((set) => ({
  channels: [],

  selectedChannel: null,

  // Set selected channel { name, id }
  setSelectedChannel: (channel) => set({ selectedChannel: channel }),


  // Set entire channel list
  setChannels: (channelsList) => set({ channels: channelsList }),

  // Add a single channel
  addChannel: (newChannel) =>
    set((state) => ({
      channels: [...state.channels, newChannel],
    })),

  // Remove a channel by ID
  removeChannel: (channelId) =>
    set((state) => ({
      channels: state.channels.filter((channel) => channel._id !== channelId),
    })),
}));

export default useChannelStore;
