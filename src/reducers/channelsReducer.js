/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { _ } from 'core-js';

import routes from '../routes.js';

const updateChannels = createAsyncThunk(
  'channelData/updateChannels',
  async ({ authHeader, logOut }) => {
    try {
      const { data } = await axios.get(routes.curentDataPath(), { headers: authHeader });
      // debugger
      return data;
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) return logOut();
    }
    return new Error('Сhannels update error');
  },
);

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
      //  state.channels.filter((channel) => channel.id === channelId);
      _.remove(state.channels, (channel) => channel.id === channelId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateChannels.fulfilled, (state, action) => {
      const channelsList = action.payload.channels.map((channel) => channel.id);
      const hasChannel = channelsList.includes(state.currentChannelId);
      state.channels = action.payload.channels;
      state.currentChannelId = hasChannel
        ? state.currentChannelId : action.payload.currentChannelId;
    });
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
  updateChannels,
};

export default channelsReduser.reducer;
