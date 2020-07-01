import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { thankyouDialogAction } from '../../store/dialog/actions';
import { DialogNames } from '../../store/dialog/types';

type Props = {
  type: string
}

const ThankyouModal = ({ type }: Props) => {
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
        {type === 'register' &&
          <p>Thank you for registering - please check your email to view your Welcome email</p>
        }
        {type === 'tour-session' &&
          <p>a verification code has been sent to your email. Please check and follow the instructions provided!</p>
        }
      </Modal.Body>
    </Modal>
  )
}

export default ThankyouModal;