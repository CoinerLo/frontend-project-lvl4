import React from 'react';
import {
  Navbar as NavbarBS, // Button, Container, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  console.log(t);
  return (
    <NavbarBS>
      <div>This is navbar!</div>
    </NavbarBS>
  );
};

export default Navbar;
