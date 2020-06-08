import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type UserActions = ActionType<typeof actions>;

export interface IUserState {
  user: object
  loading: boolean
}

export enum Constants {
  REGISTER_USER = 'REGISTER_USER',
  LOGIN_USER = 'LOGIN_USER',
  UPDATTE_USER = 'UPDATE_USER',
  SET_LOADING = 'SET_LOADING',
}
