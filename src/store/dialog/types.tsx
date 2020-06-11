import { Action } from 'redux';

export interface IDialogState {
  name: string,
  isOpened: boolean,
}

export interface IDispatchDialogAction extends Action {
  payload?: any;
}

export enum Constants {
  REGISTER_USER_DIALOG = 'REGISTER_USER_DIALOG',
  LOGIN_USER_DIALOG = 'LOGIN_USER_DIALOG',
  FORGOT_PASSWORD_DIALOG = 'FORGOT_PASSWORD_DIALOG',
  RESET_PASSWORD_DIALOG = 'RESET_PASSWORD_DIALOG',
  ENTER_CODE_DIALOG = 'ENTER_CODE_DIALOG',
  THANKYOU_DIALOG = 'THANKYOU_DIALOG'
}
