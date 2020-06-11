import { Reducer } from 'redux';
import { Constants, IDialogState, IDispatchDialogAction } from './types';

const initDialog: IDialogState = {
  name: '',
  isOpened: false,
};

export const dialogReducer: Reducer<IDialogState, IDispatchDialogAction> = (state = initDialog, action) => {
  switch (action.type) {
    case Constants.REGISTER_USER_DIALOG:
      return {...state, ...action.payload};
    case Constants.LOGIN_USER_DIALOG:
      return {...state, ...action.payload};
    case Constants.FORGOT_PASSWORD_DIALOG:
      return {...state, ...action.payload};
    case Constants.RESET_PASSWORD_DIALOG:
      return {...state, ...action.payload};
    default:
      return state;
  }
}