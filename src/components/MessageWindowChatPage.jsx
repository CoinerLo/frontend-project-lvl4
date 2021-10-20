import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';

import MessageFormChat from './MessageFormChat.jsx';
import { getCurrentChannel } from '../reducers/channelsReducer.js';
import { getCurrentChannelMessages } from '../reducers/messageReducer.js';

const Message = ({ user, text, id }) => (
  <div key={id} className="text-breake mb-2">
    <b>{user}</b>
    {': '}
    {text}
  </div>
);

const MessageWindowChatPage = () => {
  const { t } = useTranslation();

  const currentChannel = useSelector(getCurrentChannel);
  const nameChannel = currentChannel && currentChannel.name;

  const messages = useSelector(getCurrentChannelMessages);
  const messagesLength = messages.length;

  useEffect(() => scroll.scrollToBottom({
    containerId: 'message-box', smooth: false, duration: 0,
  }), [messages]);

  return (
    <Col className="h-100 p-0">
      <div className="d-flex flex-column h-100">
        <div id="messagesBox" className="bg-light p-3 mb-4 shadow-sm small">
          <p className="m-0">
            <b>{`# ${nameChannel}`}</b>
          </p>
          <span className="text-muted">{t('counts.key', { count: messagesLength ?? 0 })}</span>
        </div>
        <div id="message-box" className="chat-messages overflow-auto px-5">
          {messages.map(Message)}
        </div>
        <MessageFormChat />
      </div>
    </Col>
  );
};

export default MessageWindowChatPage;
