import { combineReducers } from '@reduxjs/toolkit';

import channelsReducer from './channelsReducer.js';
import messagesReducer from './messageReducer.js';

export default combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
});
