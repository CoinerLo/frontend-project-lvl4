import React, { useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  FormControl,
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
    <div className="mt-auto py-3 px-5">
      <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup className="has-validation">
          <FormControl
            name="message"
            data-testid="new-message"
            className="border-0 p-0 ps-2"
            maxLength={inputItemsMaxLength}
            ref={textInput}
            placeholder={t('messages.add')}
            value={formik.values.message}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
            required
          />
          <div className="input-group-append ">
            <Button
              type="submit"
              className="btn-group-vertical border-0"
              variant="outline-secondary"
              disabled={formik.isSubmitting || !formik.values.message}
            >
              {formik.isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" role="status" />
                  <span className="ms-2">{t('messages.sending')}</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
                  <span className="visually-hidden">{t('messages.send')}</span>
                </>
              )}
            </Button>
          </div>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageFormChat;
