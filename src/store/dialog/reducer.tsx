import { Reducer } from 'redux';
import { DialogNames, IDialogState, IDispatchDialogAction } from './types';
import { stat } from 'fs';

const initDialog: IDialogState = {
  name: '',
  isOpened: false,
};

export const dialogReducer: Reducer<IDialogState, IDispatchDialogAction> = (state = initDialog, action) => {  
  switch (action.type) {
    case DialogNames.REGISTER_USER_DIALOG:
      return {...state, ...action.payload};
    case DialogNames.LOGIN_USER_DIALOG:
      return {...state, ...action.payload};
    case DialogNames.FORGOT_PASSWORD_DIALOG:
      return {...state, ...action.payload};
    case DialogNames.RESET_PASSWORD_DIALOG:
      return {...state, ...action.payload};
    case DialogNames.ENTER_CODE_DIALOG:
      return {...state, ...action.payload};
    case DialogNames.THANKYOU_DIALOG:
      return {...state, ...action.payload};
    case DialogNames.VOICE_CHATTING_DIALOG:
      return {...state, ...action.payload};
    case DialogNames.SET_TWILIO_CONNECTION:
console.log({...state, ...action.payload});      
      return {...state, ...action.payload};
    default:
      return state;
  }
}