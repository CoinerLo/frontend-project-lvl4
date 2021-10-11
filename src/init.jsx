import React from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import locales from './locales/index.js';
import reducer from './reducers/index.js';
import { updateChannels } from './reducers/channelsReducer.js';
import ApiContext from './context/ApiContext.jsx';

const init = async (socket) => {
  const store = configureStore({ reducer });

  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources: locales,
      fallbackLng: 'ru',
    });

  const getStoreData = (authData) => {
    socket.on('connect', () => {
      if (socket.connected) store.dispatch(updateChannels(authData));
    });
  };

  const api = {
    getStoreData,
  };

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
