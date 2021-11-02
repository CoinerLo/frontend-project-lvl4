import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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
    <div className="h-sm-100 h-75 p-0 col col-sm-10">
      <div className="d-flex h-100 flex-column justify-content-between">
        <div className="p-3 small shadow-sm bg-light">
          <p className="m-0">
            <b>{`# ${nameChannel}`}</b>
          </p>
          <span className="text-muted">{t('counts.key', { count: messagesLength ?? 0 })}</span>
        </div>
        <div id="message-box" className="overflow-auto px-2 px-sm-5 pb-2 pb-sm-5 mb-2">
          {messages.map(Message)}
        </div>
        <MessageFormChat />
      </div>
    </div>
  );
};

export default MessageWindowChatPage;
