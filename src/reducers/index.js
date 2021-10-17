import { combineReducers } from '@reduxjs/toolkit';

import channelsReducer from './channelsReducer.js';
import messagesReducer from './messageReducer.js';
import modalsReducer from './modalsReducer.js';

export default combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  modals: modalsReducer,
});
