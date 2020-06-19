import { action } from 'typesafe-actions';
import { DialogNames } from './types';

export const registerUserDialogAction = (data: any) => {
  return action(DialogNames.REGISTER_USER_DIALOG, {
    name: DialogNames.REGISTER_USER_DIALOG,
    isOpened: data
  });
}

export const loginUserDialogAction = (data: any) => {
  return action(DialogNames.LOGIN_USER_DIALOG, {
    name: DialogNames.LOGIN_USER_DIALOG,
    isOpened: data
  });
}

export const forgotPasswordDialogAction = (data: any) => {
  return action(DialogNames.FORGOT_PASSWORD_DIALOG, {
    name: DialogNames.FORGOT_PASSWORD_DIALOG,
    isOpened: data
  });
}

export const resetPasswordDialogAction = (data: any) => {
  return action(DialogNames.RESET_PASSWORD_DIALOG, {
    name: DialogNames.RESET_PASSWORD_DIALOG,
    isOpened: data.isOpened,
    code: data.code
  })
}

export const enterCodeDialogAction = (data: any) => {
  return action(DialogNames.ENTER_CODE_DIALOG, {
    name: DialogNames.ENTER_CODE_DIALOG,
    isOpened: data
  })
}

export const thankyouDialogAction = (data: any) => {
  return action(DialogNames.THANKYOU_DIALOG, {
    name: DialogNames.THANKYOU_DIALOG,
    isOpened: data
  })
}

export const voiceChattingDialogAction = (data: any) => {
  return action(DialogNames.VOICE_CHATTING_DIALOG, {
    name: DialogNames.VOICE_CHATTING_DIALOG,
    isOpened: data.isOpened,
    role: data.role,
    action: data.action
  })
}
