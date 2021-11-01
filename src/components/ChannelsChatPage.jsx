import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormGroup, Button, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { getChannels, getCurrentChannel, setCurrentChannelId } from '../reducers/channelsReducer.js';
import ChannelItem from './ChannelItem.jsx';
import { openModal } from '../reducers/modalsReducer.js';

const modalTypes = {
  add: 'adding',
  remove: 'removing',
  rename: 'renaming',
};

const handleChangeChannel = (dispatch, id) => () => dispatch(setCurrentChannelId({ id }));
const handleAddChannel = (dispatch) => () => dispatch(openModal({ type: modalTypes.add }));
const handleRemoveChannel = (dispatch, id) => () => (
  dispatch(openModal({ type: modalTypes.remove, id }))
);
const handleRenameChannel = (dispatch, id) => () => (
  dispatch(openModal({ type: modalTypes.rename, id }))
);

const ChannelsChatPage = () => {
  const { t } = useTranslation();
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);
  const dispatch = useDispatch();

  const item = (channel) => {
    const { id } = channel;
    const variant = currentChannel && currentChannel.id === id ? 'secondary' : '';
    return (
      <ChannelItem
        variant={variant}
        channel={channel}
        key={id}
        handleChangeChannel={handleChangeChannel(dispatch, id)}
        handleRemoveChannel={handleRemoveChannel(dispatch, id)}
        handleRenameChannel={handleRenameChannel(dispatch, id)}
      />
    );
  };

  return (
    <div id="channelBox" className="d-flex flex-column h-100 col-sm-2 border-end pt-5 px-0 bg-light overflow-auto">
      <FormGroup className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <Button
          type="button"
          variant="outline-primaty"
          className="py-0 btn text-primary btn-group-vertical"
          onClick={handleAddChannel(dispatch)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </FormGroup>
      <FormGroup id="channelsList" className="h-100 pb-3 pe-1">
        <ListGroup className="nav nav-pills nav-fill px-2">
          {channels.map((channel) => item(channel))}
        </ListGroup>
      </FormGroup>
    </div>
  );
};

export default ChannelsChatPage;
