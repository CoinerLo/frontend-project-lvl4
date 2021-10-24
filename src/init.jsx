import React from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import locales from './locales/index.js';
import reducer from './reducers/index.js';
import {
  addChannel, removeChannel, renameChannel,
} from './reducers/channelsReducer.js';
import { addMessage } from './reducers/messageReducer.js';
import ApiContext from './context/ApiContext.jsx';

const actions = {
  connect: 'connect',
  newMessage: 'newMessage',
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel',
};

const init = async (socket) => {
  const store = configureStore({ reducer });

  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources: locales,
      fallbackLng: 'ru',
    });

  const emitVolatileSocet = (action) => (data) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(Error('errors.netError')), 3000);
    socket.volatile.emit(action, data, (res) => {
      if (res.status === 'ok') {
        clearTimeout(timer);
        resolve(res);
      }
    });
  });

  const api = {
    addChannel: emitVolatileSocet(actions.newChannel),
    sendMessage: emitVolatileSocet(actions.newMessage),
    renameChannel: emitVolatileSocet(actions.renameChannel),
    removeChannel: emitVolatileSocet(actions.removeChannel),
  };

  socket.on(actions.newChannel, (data) => {
    store.dispatch(addChannel({ channelData: data }));
  });

  socket.on(actions.newMessage, (data) => {
    store.dispatch(addMessage({ messageData: data }));
  });

  socket.on(actions.renameChannel, (data) => {
    const { id, name } = data;
    store.dispatch(renameChannel({ channelId: id, channelName: name }));
  });

  socket.on(actions.removeChannel, (data) => {
    store.dispatch(removeChannel({ channelId: data.id }));
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ApiContext.Provider value={api}>
          <App />
        </ApiContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
