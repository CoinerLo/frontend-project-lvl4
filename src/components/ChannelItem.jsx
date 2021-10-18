import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChannelItem = ({
  variant,
  channel,
  handleChangeChannel,
  handleRemoveChannel,
  handleRenameChannel,
}) => {
  const { t } = useTranslation();
  const { name, removable } = channel;

  const ChannelButtons = (isRemovable) => {
    if (!isRemovable) {
      return (
        <Button
          variant={variant}
          className="w-100 px-1 rounded-0 text-start"
          onClick={handleChangeChannel}
        >
          <span className="me-2">#</span>
          {name}
        </Button>
      );
    }
    return (
      <Dropdown className="d-flex w-100" as={ButtonGroup}>
        <Button
          variant={variant}
          className="w-100 px-1 rounded-0 text-start"
          onClick={handleChangeChannel}
        >
          <span className="me-2">#</span>
          {name}
        </Button>
        <Dropdown.Toggle
          split
          variant={variant}
          className="flex-grow-0 text-left"
        />
        <Dropdown.Menu variant={variant} title="menu">
          <Dropdown.Item onClick={handleRemoveChannel}>{t('channels.remove')}</Dropdown.Item>
          <Dropdown.Item onClick={handleRenameChannel}>{t('channels.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <li className="nav-item">
      {ChannelButtons(removable)}
    </li>
  );
};
export default ChannelItem;
