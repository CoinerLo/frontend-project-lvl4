import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useRef } from 'react';
import {
  Button, Card, Form, FormControl, FormGroup, FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import AuthContext from '../context/AuthContext.jsx';
import routes from '../routes.js';
import registrationImg from '../../assets/images/registrationPageImg.jpg';

const SignupPage = () => {
  const { t } = useTranslation();
  const { logIn } = useContext(AuthContext);
  const history = useHistory();

  const nameInput = useRef();
  useEffect(() => nameInput.current.focus(), [nameInput]);

  const validationSchema = Yup.object({
    username: Yup.string().trim()
      .min(3, 'errors.length')
      .max(20, 'errors.length')
      .required('errors.required'),
    password: Yup.string().trim()
      .min(5, 'errors.passMin')
      .max(20, 'errors.passMax')
      .required('errors.required'),
    confirmPassword: Yup.string().trim()
      .oneOf([Yup.ref('password'), null], 'errors.confirm')
      .required('errors.required'),
  });

  const getError = (e) => {
    if (e.response.status === 409) return 'errors.existing';
    if (e.response.statusText === 'Network Error') return 'errors.netError';
    return 'errors.someError';
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (value, { setErrors }) => {
      const { chatPagePath, signupPath } = routes;
      const { username, password } = value;
      try {
        const { data } = await axios.post(signupPath(), { username, password });
        logIn(data);
        history.push(chatPagePath());
      } catch (err) {
        console.log(err);
        nameInput.current.select();
        setErrors({ username: ' ', password: ' ', confirmPassword: getError(err) });
      }
    },
  });

  // const Feedback = (formName) => (
  //  <Form.Control.Feedback type="invalid" placement="right" tooltip>
  //    {formik.touched[formName]
  //      && Boolean(formik.errors[formName])
  //      && t(formik.errors[formName])}
  //  </Form.Control.Feedback>
  // );

  return (
    <div className="conteiner-fluid flex-grow-1 h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card id="signUp" className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={registrationImg} alt="registrationPicture" className="rounded-circle" />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signupPage.registration')}</h1>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    ref={nameInput}
                    name="username"
                    placeholder={t('signupPage.username')}
                    type="text"
                    id="username"
                    autoComplete="username"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.touched.username && Boolean(formik.errors.username)}
                    required
                  />
                  <FormLabel htmlFor="username">{t('signupPage.username')}</FormLabel>
                  <Form.Control.Feedback type="invalid" placement="right" tooltip>
                    {formik.touched.username
                      && Boolean(formik.errors.username)
                      && t(formik.errors.username)}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    name="password"
                    type="password"
                    id="password"
                    placeholder={t('signupPage.password')}
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                    required
                  />
                  <FormLabel htmlFor="username">{t('signupPage.password')}</FormLabel>
                  <Form.Control.Feedback type="invalid" placement="right" tooltip>
                    {formik.touched.password
                      && Boolean(formik.errors.password)
                      && t(formik.errors.password)}
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    placeholder={t('signupPage.confirmPass')}
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={
                      formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                    }
                    required
                  />
                  <FormLabel htmlFor="username">{t('signupPage.confirmPass')}</FormLabel>
                  <Form.Control.Feedback type="invalid" placement="right" tooltip>
                    {formik.touched.confirmPassword
                      && Boolean(formik.errors.confirmPassword)
                      && t(formik.errors.confirmPassword)}
                  </Form.Control.Feedback>
                </FormGroup>
                <Button type="submit" className="w-100 mb-3" variant="outline-primary">
                  {t('signupPage.registerNow')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
