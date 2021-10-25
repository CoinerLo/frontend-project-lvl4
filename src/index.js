/* eslint-disable no-unused-vars */
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import Rollbar from 'rollbar';

import '../assets/application.scss';
import init from './init.jsx';

const start = async () => {
  const rollbar = new Rollbar({
    accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    // enabled: process.env.NODE_ENV === 'production',
  });

  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const url = window.location.origin;
  const socet = io(url);

  const initStartDom = await init(socet);
  const conteiner = document.getElementById('chat');

  ReactDOM.render(initStartDom, conteiner);
};

start();
