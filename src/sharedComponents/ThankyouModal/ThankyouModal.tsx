import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { thankyouDialogAction } from '../../store/dialog/actions';
import { Constants } from '../../store/dialog/types';

type Props = {
  thankyouDialogAction: Function
}

const ThankyouModal = ({thankyouDialogAction}: Props) => {
  const { dialog } = useSelector((state: any) => ({
    dialog: state.dialog
  }))

  return (
    <Modal
      show={dialog.isOpened && dialog.name === Constants.THANKYOU_DIALOG}
      onHide={() => {thankyouDialogAction(false)}}
      centered
      className="thankyou-modal"
    >
      <Modal.Body>
        <h1>Thank you!</h1>
        <p>your registration has been sent and you will receive an email when it's been approved</p>
      </Modal.Body>
    </Modal>
  )
}

export default connect(null, {thankyouDialogAction})(ThankyouModal);