import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import routes from '../routes.js';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Switch>
        <Route path={routes.loginPagePath()}>
          <LoginPage />
        </Route>
        <Route path={routes.signupPagePath()}>
          <SignupPage />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
