import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormGroup, Button, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { getChannels, getCurrentChannel } from '../reducers/channelsReducer.js';
import ChannelItem from './ChannelItem.jsx';

const handleAddChannel = (dispatch) => () => dispatch({ type: 'add' });

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
      />
    );
  };

  return (
    <div id="channelBox" className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <FormGroup className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <Button
          type="button"
          variant="outline-primaty"
          className="py-0 btn-sm btn-group-vertical"
          onClick={handleAddChannel(dispatch)}
        >
          <span className="fs-5">+</span>
        </Button>
      </FormGroup>
      <FormGroup id="channelsList" className="h-100 pb-3 pe-1 overflow-auto">
        <ListGroup className="nav flex-column nav-pills nav-fill px-2">
          {channels.map((channel) => item(channel))}
        </ListGroup>
      </FormGroup>
    </div>
  );
};

export default ChannelsChatPage;
