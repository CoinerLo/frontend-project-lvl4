/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import routes from '../routes.js';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import ChatPage from './ChatPage.jsx';
import Navbar from './Navbar.jsx';
import ModalComponent from './Modal.jsx';

const localStorageKeys = {
  loggedUserData: 'loggedUserData',
};

const PageNotFound = () => (
  <div className="d-flex h-100 justify-content-center align-items-center">
    <h2>Oops, something went wrong</h2>
  </div>
);

const getAuthHeader = () => {
  const loggedUser = JSON.parse(localStorage.getItem(localStorageKeys.loggedUserData));
  if (loggedUser && loggedUser.token) {
    return { Authorization: `Bearer ${loggedUser.token}` };
  }
  return {};
};

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem(localStorageKeys.loggedUserData));
  const [user, setUser] = useState(userData ? { username: userData.username } : null);

  const logIn = (loggedUser) => {
    localStorage.setItem(localStorageKeys.loggedUserData, JSON.stringify(loggedUser));
    setUser({ username: loggedUser.username });
  };

  const logOut = () => {
    localStorage.removeItem(localStorageKeys.loggedUserData);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      getAuthHeader, user, logIn, logOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const MainRoute = ({ children, ...props }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...props}
      render={({ location }) => (user ? children
        : (<Redirect to={{ pathname: routes.loginPagePath(), state: { from: location } }} />))}
    />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Switch>
          <MainRoute exact path={routes.chatPagePath()}>
            <ChatPage />
          </MainRoute>
          <Route path={routes.loginPagePath()}>
            <LoginPage />
          </Route>
          <Route path={routes.signupPagePath()}>
            <SignupPage />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </Router>
    <ModalComponent />
  </AuthProvider>
);

export default App;
