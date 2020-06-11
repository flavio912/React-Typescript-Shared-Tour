import { action } from 'typesafe-actions';
import { Constants } from './types';

export function registerUserDialogAction(data: any) {
  return action(Constants.REGISTER_USER_DIALOG, {
    name: Constants.REGISTER_USER_DIALOG,
    isOpened: data
  });
}

export function loginUserDialogAction(data: any) {
  return action(Constants.LOGIN_USER_DIALOG, {
    name: Constants.LOGIN_USER_DIALOG,
    isOpened: data
  });
}

export function forgotPasswordDialogAction(data: any) {
  return action(Constants.FORGOT_PASSWORD_DIALOG, {
    name: Constants.FORGOT_PASSWORD_DIALOG,
    isOpened: data
  });
}

export function resetPasswordDialogAction(data: any) {
  return action(Constants.RESET_PASSWORD_DIALOG, {
    name: Constants.RESET_PASSWORD_DIALOG,
    isOpened: data
  })
}

export function enterCodeDialogAction(data: any) {
  return action(Constants.ENTER_CODE_DIALOG, {
    name: Constants.ENTER_CODE_DIALOG,
    isOpened: data
  })
}

export function thankyouDialogAction(data: any) {
  return action(Constants.THANKYOU_DIALOG, {
    name: Constants.THANKYOU_DIALOG,
    isOpened: data
  })
}