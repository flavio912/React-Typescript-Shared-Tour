import { Action } from 'redux';

export interface IUserState {
  token: string,
  user: {
    email: string,
    password: string,
    name: string,
    phone: string,
    role: string,
    country: string  
  }
}

export interface IDispatchUserAction extends Action {
  payload?: any;
}

export enum Constants {
  REGISTER_USER = 'REGISTER_USER',
  LOGIN_USER = 'LOGIN_USER',
  UPDATTE_USER = 'UPDATE_USER',
  LOGOUT_USER = 'LOGOUT_USER'
}
