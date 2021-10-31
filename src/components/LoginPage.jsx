import React, { useRef, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../routes.js';
import AuthContext from '../context/AuthContext.jsx';
import loginImage from '../../assets/images/loginPageImage.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const { logIn } = useContext(AuthContext);
  const nameInput = useRef(null);

  useEffect(() => {
    nameInput.current.focus();
  }, [nameInput]);

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('errors.required'),
    password: Yup.string()
      .required('errors.required'),
  });

  const getError = (e) => {
    if (e.response.status === 401) {
      return 'errors.logError';
    }
    if (e.response.statusText === 'Network Error') {
      return 'errors.netError';
    }
    return 'errors.someError';
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (value, { setErrors }) => {
      const { chatPagePath, loginPath } = routes;
      try {
        const { data } = await axios.post(loginPath(), value);
        logIn(data);
        const { pathname } = location.state.from;
        history.replace(pathname ?? chatPagePath());
      } catch (e) {
        console.log(e.response);
        nameInput.current.select();
        setErrors({ username: getError(e), password: getError(e) });
      }
    },
  });

  return (
    <div className="container-fluid flex-grow-1">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-xl-8 col-xxl-6">
          <Card id="logIn" className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div><img src={loginImage} className="rounded-circle" alt={t('loginPage.login')} /></div>
              <Form className="w-sm-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('loginPage.login')}</h1>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    ref={nameInput}
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    placeholder={t('loginPage.nickname')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.touched.username && Boolean(formik.errors.username)}
                  />
                  <FormLabel htmlFor="username">{t('loginPage.nickname')}</FormLabel>
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="curent-password"
                    placeholder={t('loginPage.password')}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                  />
                  <FormLabel htmlFor="password">{t('loginPage.password')}</FormLabel>
                  <Form.Control.Feedback type="invalid" tooltip>{t(formik.errors.password)}</Form.Control.Feedback>
                </FormGroup>
                <Button type="submit" className="mb-3 w-100" variant="outline-primary">{t('loginPage.login')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex flex-column align-items-center">
                <span className="small mb-2">{t('loginPage.isAccount')}</span>
                <NavLink to={routes.signupPagePath()}>{t('loginPage.signup')}</NavLink>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
