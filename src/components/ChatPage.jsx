import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import AuthContext from '../context/AuthContext.jsx';
import ChannelsChatPage from './ChannelsChatPage.jsx';
import MessageWindowChatPage from './MessageWindowChatPage.jsx';
import { loadingChannels } from '../reducers/channelsReducer.js';
import { loadingMessages } from '../reducers/messageReducer.js';
import routes from '../routes.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const { getAuthHeader, logOut } = useContext(AuthContext);
  const [isLoaded, setLoadingStatus] = useState(false);
  const dispatch = useDispatch();
  const authHeader = getAuthHeader();

  const getStoreData = async (auth) => {
    try {
      const res = await axios.get(routes.curentDataPath(), { headers: auth });
      const { channels, messages } = res.data;
      dispatch(loadingChannels({ channels }));
      dispatch(loadingMessages({ messages }));
      setLoadingStatus(true);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        console.log('Authorization error!');
        logOut();
      }
    }
  };

  const LoadingComplete = () => (
    <Container className="overflow-hidden h-100 my-4 rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsChatPage />
        <MessageWindowChatPage />
      </div>
    </Container>
  );

  const Loading = () => (
    <>
      <Spinner animation="grow" role="status" variant="primary" />
      <span>{t('chatPage.loading')}</span>
    </>
  );

  useEffect(() => {
    getStoreData(authHeader);
  }, []);

  return isLoaded ? LoadingComplete() : Loading();
};

export default ChatPage;
