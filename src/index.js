import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import init from './init.jsx';

const start = async () => {
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
