import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';

import MessageFormChat from './MessageFormChat.jsx';
import { getCurrentChannel } from '../reducers/channelsReducer.js';
import { getCurrentChannelMessages } from '../reducers/messageReducer.js';

const Message = ({ user, text, id }) => (
  <div key={id} className="text-break mb-2">
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
      <div className="d-flex flex-column h-100 position-relative">
        <div className="bg-light p-3 shadow-sm small w-100">
          <p className="m-0">
            <b>{`# ${nameChannel}`}</b>
          </p>
          <span className="text-muted">{t('counts.key', { count: messagesLength ?? 0 })}</span>
        </div>
        <div id="message-box" className="flex-grow-1 chat-messages overflow-auto px-5 pb-5 mb-2">
          {messages.map(Message)}
        </div>
        <MessageFormChat />
      </div>
    </Col>
  );
};

export default MessageWindowChatPage;
