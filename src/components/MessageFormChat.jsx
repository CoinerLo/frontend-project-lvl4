import React, { useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  FormControl,
  FormGroup,
  InputGroup,
  Button,
  Form,
  Spinner,
} from 'react-bootstrap';

import ApiContext from '../context/ApiContext.jsx';
import AuthContext from '../context/AuthContext.jsx';
import { getCurrentChannel } from '../reducers/channelsReducer.js';

const inputItemsMaxLength = 400;

const MessageFormChat = () => {
  const { t } = useTranslation();
  const { sendMessage } = useContext(ApiContext);
  const { user } = useContext(AuthContext);
  const { username } = user;
  const textInput = useRef(null);
  const currentChannelId = useSelector(getCurrentChannel);

  const validationSchema = Yup.object({
    message: Yup.string().trim()
      .max(inputItemsMaxLength)
      .required(t('errors.required')),
  });

  const formik = useFormik({
    initialValues: { message: '' },
    validationSchema,
    onSubmit: async (initialValues, { resetForm, setErrors }) => {
      const message = {
        user: username,
        channelId: currentChannelId.id,
        text: initialValues.message,
      };
      try {
        await sendMessage(message);
        resetForm();
      } catch (err) {
        console.log(err);
        setErrors({
          message: t(err.message === 'errors.netError'
            ? 'errors.netError'
            : 'errors.someError'),
        });
      }
    },
  });

  useEffect(() => textInput.current.focus());

  return (
    <FormGroup className="border-top mt-auto py-3 px-5">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <InputGroup>
          <FormControl
            name="message"
            data-testid="new-message"
            maxLength={inputItemsMaxLength}
            ref={textInput}
            placeholder={t('messages.add')}
            value={formik.values.message}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
            isInvalid={formik.errors.message}
            required
          />
          <Button
            type="submit"
            className="ml-2"
            variant="outline-secondary"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <Spinner animation="border" size="sm" role="status" />
                <span className="ms-2">{t('messages.sending')}</span>
              </>
            ) : <b>{t('messages.send')}</b>}
          </Button>
          <Form.Control.Feedback type="invalid">{t(formik.errors.message)}</Form.Control.Feedback>
        </InputGroup>
      </Form>
    </FormGroup>
  );
};

export default MessageFormChat;
