import { useFormik } from 'formik';
import React, { useContext, useEffect, useRef } from 'react';
import {
  Button, Form, FormControl, InputGroup, Modal, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import ApiContext from '../../context/ApiContext.jsx';
import { setCurrentChannelId } from '../../reducers/channelsReducer.js';

const CreateChannel = ({ close, channelsNames, dispatch }) => {
  const { t } = useTranslation();
  const { addChannel } = useContext(ApiContext);
  const validationSchema = Yup.object({
    channelName: Yup.string().trim()
      .min(3, 'errors.length')
      .max(20, 'errors.length')
      .notOneOf(channelsNames, 'errors.uniq')
      .required('errors.required'),
  });

  const formik = useFormik({
    initialValues: { channelName: '' },
    validateOnChange: false,
    validationSchema,
    onSubmit: async (initialValues, { setErrors }) => {
      const name = initialValues.channelName.trim();
      try {
        const response = await addChannel({ name });
        const { id } = response.data;
        dispatch(setCurrentChannelId({ id }));
        close();
      } catch (err) {
        console.log(err);
        setErrors({
          channelName: t(err.message === 'errors.netError'
            ? 'errors.netError' : 'errors.someError'),
        });
      }
    },
  });

  const textInput = useRef(null);
  useEffect(() => textInput.current.select(), [textInput]);

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
        <Button
          aria-label="Close"
          variant="secondary"
          className="btn-close"
          onClick={close}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup className="mt-auto" noValidate>
            <FormControl
              ref={textInput}
              name="channelName"
              placeholder={t('modals.placeholders')}
              value={formik.values.channelName}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              maxLength={20}
              isInvalid={formik.errors.channelName}
              required
            />
            <Form.Control.Feedback type="invalid">{t(formik.errors.channelName)}</Form.Control.Feedback>
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button
          type="cancel"
          variant="secondary"
          onClick={close}
          disabled={formik.isSubmitting}
        >
          {t('modals.cancel')}
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <>
              <Spinner animation="border" size="sm" role="status" />
              <span className="ms-2">{t('messages.sending')}</span>
            </>
          ) : t('modals.send')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default CreateChannel;
