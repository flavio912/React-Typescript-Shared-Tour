import { Action } from 'redux';

export interface IDialogState {
  name: string,
  isOpened: boolean
}

export interface IDispatchDialogAction extends Action {
  payload?: any;
}

export enum DialogNames {
  REGISTER_USER_DIALOG = 'register_user',
  LOGIN_USER_DIALOG = 'login_user',
  FORGOT_PASSWORD_DIALOG = 'forgot_password',
  RESET_PASSWORD_DIALOG = 'reset_password',
  ENTER_CODE_DIALOG = 'enter_code',
  THANKYOU_DIALOG = 'thankyou',
  VOICE_CHATTING_DIALOG = 'voice_chatting',
}
