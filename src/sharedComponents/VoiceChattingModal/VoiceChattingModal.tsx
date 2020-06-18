import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import { voiceChattingDialogAction } from '../../store/dialog/actions';
import { DialogNames } from '../../store/dialog/types';
import * as CONSTANTS from '../../constants';

const VoiceChattingModal = () => {
  const dispatch = useDispatch();
  const { dialog } = useSelector((state: any) => ({
    dialog: state.dialog
  }));
  const [status, setStatus] = useState('');
  
  useEffect(() => {
console.log(dialog.action);    
    setStatus(dialog.action);
  }, [dialog.action])
  
  return (
    <Modal
      show={dialog.isOpened && dialog.name === DialogNames.VOICE_CHATTING_DIALOG}
      onHide={() => {dispatch(voiceChattingDialogAction({isOpened: false}))}}
      centered
      className="voice-chatting-modal"
    >
      <Modal.Body>
        {dialog.action !== 'start'?
          (
            dialog.role === CONSTANTS.VoiceCallRoles.master?
            <p>Calling....</p>
            :
            <p>Incoming Call....</p>            
          )
          :
          (
            <p>Call Started</p>
          )
        }
        {(dialog.role === CONSTANTS.VoiceCallRoles.slave) && dialog.action !== 'start'?
          <>
            <Button 
              onClick={() => {
                dispatch(voiceChattingDialogAction({
                  isOpened: true, 
                  role: CONSTANTS.VoiceCallRoles.slave, 
                  action: CONSTANTS.VoiceCallActions.accept
                }))
              }}>
              Accept
            </Button>
            <div className="cancel-btn d-flex justify-content-center align-items-center mt-3">
              <a onClick={() => {
                  dispatch(voiceChattingDialogAction({
                    isOpened: false, 
                    role: CONSTANTS.VoiceCallRoles.slave, 
                    action: CONSTANTS.VoiceCallActions.decline
                  }))
                }}
              >
                Decline
              </a>
            </div>
          </> : null
        }
        {(dialog.role === CONSTANTS.VoiceCallRoles.master) || dialog.action === 'start'?
          <Button 
            onClick={() => {
              dispatch(voiceChattingDialogAction({
                isOpened: false, 
                role: CONSTANTS.VoiceCallRoles.master, 
                action: CONSTANTS.VoiceCallActions.hangup
              }))
            }}>
            Cancel
          </Button>: null
        }
      </Modal.Body>
    </Modal>
  )
}

export default VoiceChattingModal;