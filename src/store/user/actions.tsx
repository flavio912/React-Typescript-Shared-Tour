import { action } from 'typesafe-actions';
import { Constants } from './types';

export function registerUserAction(data: object) {
  return action(Constants.REGISTER_USER, data);
}

export function loginUserAction(data: object) {
  return action(Constants.LOGIN_USER, data);
}

export function updateUserAction(data: object) {
  return action(Constants.UPDATTE_USER, data);
}

export function logoutUserAction() {
  return action(Constants.LOGOUT_USER);
}