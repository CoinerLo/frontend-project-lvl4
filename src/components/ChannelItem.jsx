import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChannelItem = ({ variant, channel }) => {
  const { t } = useTranslation();
  const { name, removable } = channel;

  const ChannelButtons = (isRemovable) => {
    if (isRemovable) {
      return (
        <Button
          variant={variant}
          className="w-100 px-1 rounded-0 text-start"
        >
          <span className="me-2">#</span>
          {name}
        </Button>
      );
    }
    return (
      <Dropdown className="d-flex" as={ButtonGroup}>
        <Button
          variant={variant}
          className="w-100 px-1 rounded-0 rext-start"
        >
          <span className="me-2">#</span>
          {name}
        </Button>
        <Dropdown.Toggle
          split
          variant={variant}
          className="flex-grow-0 text-left"
        />
        <Dropdown.Menu variant={variant} title="">
          <Dropdown.Item>{t('channels.remove')}</Dropdown.Item>
          <Dropdown.Item>{t('channels.rename')}</Dropdown.Item>
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
