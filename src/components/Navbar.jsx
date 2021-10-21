import React, { useContext } from 'react';
import {
  Navbar as NavbarBootstrap, Button, Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AuthContext from '../context/AuthContext.jsx';
import routes from '../routes.js';

const Navbar = () => {
  const { t } = useTranslation();
  const { user, logOut } = useContext(AuthContext);
  return (
    <NavbarBootstrap id="nav" className="shadow-sm navbar-expand-lg bg-white">
      <Container>
        <NavbarBootstrap.Brand as={Link} to={routes.chatPagePath()}>
          {t('hexletChat')}
        </NavbarBootstrap.Brand>
        {user && <Button variant="primary" onClick={logOut}>{t('chatPage.logOut')}</Button>}
      </Container>
    </NavbarBootstrap>
  );
};

export default Navbar;
