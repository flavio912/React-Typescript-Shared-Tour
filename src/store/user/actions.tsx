import { action } from 'typesafe-actions';
import { Constants } from './types';

export const registerUserAction = (data: object) => {
  return action(Constants.REGISTER_USER, data);
}

export const loginUserAction = (data: object) => {
  return action(Constants.LOGIN_USER, data);
}

export const updateUserAction = (data: object) => {
  return action(Constants.UPDATTE_USER, data);
}

export const logoutUserAction = () => {
  return action(Constants.LOGOUT_USER);
}