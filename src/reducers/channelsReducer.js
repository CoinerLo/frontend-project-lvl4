/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { _ } from 'core-js';

const channelsReduser = createSlice({
  name: 'channelData',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    loadingChannels(state, action) {
      const { channels } = action.payload;

      state.channels = channels;
      state.currentChannelId = state.channels[0].id;
    },
    addChannel(state, action) {
      const { channelData } = action.payload;
      state.channels.push(channelData);
    },
    setCurrentChannelId(state, action) {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
    renameChannel(state, action) {
      const { channelId, channelName } = action.payload;
      const currentChannel = state.channels.find((channel) => channel.id === channelId);
      currentChannel.name = channelName;
    },
    removeChannel(state, action) {
      const { channelId } = action.payload;
      if (state.currentChannelId === channelId) {
        const defaultChannel = state.channels[0].id;
        state.currentChannelId = defaultChannel;
      }
      _.remove(state.channels, (channel) => channel.id === channelId);
    },
  },
});

const getChannels = (state) => state.channels.channels;
const getCurrentChannel = (state) => state.channels.channels
  .find((channel) => channel.id === state.channels.currentChannelId);
const getChannelsNames = (state) => state.channels.channels
  .map((channel) => channel.name);

export const {
  loadingChannels,
  addChannel,
  setCurrentChannelId,
  renameChannel,
  removeChannel,
} = channelsReduser.actions;

export {
  getChannels,
  getCurrentChannel,
  getChannelsNames,
};

export default channelsReduser.reducer;
