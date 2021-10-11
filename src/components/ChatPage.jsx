import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Spinner } from 'react-bootstrap';

import AuthContext from '../context/AuthContext.jsx';
import ApiContext from '../context/ApiContext.jsx';
import ChannelsChatPage from './ChannelsChatPage.jsx';
import MessageWindowChatPage from './MessageWindowChatPage.jsx';

const ChatPage = () => {
  const { t } = useTranslation();
  const { getAuthHeader, logOut } = useContext(AuthContext);
  const { getStoreData } = useContext(ApiContext);
  const [isLoaded, setLoadingStatus] = useState(false);

  const LoadingComplete = () => (
    <Container className="flex-grow overflow-hidden h-100 my-4 rounded shadow">
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
    setLoadingStatus(true);
    const authHeader = getAuthHeader();
    getStoreData({ authHeader, logOut });
  }, []);

  return isLoaded ? LoadingComplete() : Loading();
};

export default ChatPage;
