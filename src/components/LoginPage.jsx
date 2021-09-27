import React, { useRef, useEffect } from 'react';
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
import { NavLink } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

import routes from '../routes.js';

const LoginPage = () => {
  // const { t } = useTranslation();
  const nameInput = useRef(null);

  useEffect(() => {
    nameInput.current.focus();
  }, [nameInput]);

  const validationSchema = Yup.object({
    username: Yup.string()
      .max(20, 'errors.length')
      .required('Required'),
    password: Yup.string()
      .min(6, 'errors.passMin')
      .max(20, 'errors.passMax')
      .required('errors.required'),
  });

  const getError = (e) => {
    console.log(e);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (value, { setErrors }) => {
      // const { chatPagePath, loginPath } = routes;
      try {
        console.log(value);
      } catch (e) {
        console.log(e.response);
        setErrors({ password: getError(e) });
      }
    },
  });

  return (
    <div className="container-fluid flex-grow-1">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-xl-8 col-xxl-6">
          <Card id="logIn" className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>img</div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Voititi</h1>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    ref={nameInput}
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    placeholder="nickName_I18N"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                    required
                  />
                  <FormLabel htmlFor="username">LoginNickName_I18N</FormLabel>
                </FormGroup>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="curent-password"
                    placeholder="password_I18N"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                    required
                  />
                  <FormLabel htmlFor="password">LoginPassword_I18N</FormLabel>
                  <Form.Control.Feedback type="invalid">LoginPasswordError_I18N</Form.Control.Feedback>
                </FormGroup>
                <Button type="submit" className="mb-3 w-100" variant="outline-primary">LoginButton_I18N</Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex flex-column align-items-center">
                <span className="small mb-2">QuestionAccount_I18N</span>
                <NavLink to={routes.signupPagePath()}>Registration_I18N</NavLink>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
