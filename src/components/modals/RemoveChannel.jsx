import { useFormik } from 'formik';
import React, { useContext } from 'react';
import {
  Button, FormGroup, Modal, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ApiContext from '../../context/ApiContext.jsx';

const RemoveChannel = ({ close, channelId }) => {
  const { t } = useTranslation();
  const { removeChannel } = useContext(ApiContext);

  const formik = useFormik({
    initialValues: { channelInfo: '' },
    validateOnChange: false,
    onSubmit: async (initialValues, { setErrors }) => {
      const id = channelId;
      try {
        await removeChannel({ id });
        close();
      } catch (err) {
        console.log(err);
        setErrors({
          channelInfo: t(err.message === 'errors.netError'
            ? 'errors.netError' : 'errors.someError'),
        });
      }
    },
  });

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
        <Button
          aria-label="Close"
          variant="secondary"
          className="btn-close"
          onClick={close}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirm')}</p>
        <FormGroup className="text-danger">{formik.errors.channelInfo}</FormGroup>
      </Modal.Body>
      <Modal.Footer className="justify-content-end">
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
          variant="danger"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <>
              <Spinner animation="border" size="sm" role="status" />
              <span className="ms-2">{t('modals.removing')}</span>
            </>
          ) : t('modals.remove')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveChannel;
