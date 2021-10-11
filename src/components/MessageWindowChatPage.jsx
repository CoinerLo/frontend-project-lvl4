import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import { getCurrentChannel } from '../reducers/channelsReducer.js';

const MessageWindowChatPage = () => {
  const { t } = useTranslation();

  const currentChannel = useSelector(getCurrentChannel);
  const nameChannel = currentChannel && currentChannel.name;

  return (
    <Col className="h-100 p-0">
      <div className="d-flex flex-column h-100">
        <div id="messagesBox" className="bg-light p-3 mb-4 shadow-sm small">
          <p className="m-0">
            <b>{`# ${nameChannel}`}</b>
          </p>
          <span className="text-muted">{t('Message count')}</span>
        </div>
      </div>
    </Col>
  );
};

export default MessageWindowChatPage;
