import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { thankyouDialogAction } from '../../store/dialog/actions';
import { DialogNames } from '../../store/dialog/types';

const ThankyouModal = () => {
  const dispatch = useDispatch();
  const { dialog } = useSelector((state: any) => ({
    dialog: state.dialog
  }))

  return (
    <Modal
      show={dialog.isOpened && dialog.name === DialogNames.THANKYOU_DIALOG}
      onHide={() => {dispatch(thankyouDialogAction(false))}}
      centered
      className="thankyou-modal"
    >
      <Modal.Body>
        <h1>Thank you!</h1>
        <p>Thank you for registering - please check your email to view your Welcome email</p>
      </Modal.Body>
    </Modal>
  )
}

export default ThankyouModal;