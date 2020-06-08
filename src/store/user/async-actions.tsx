import { Dispatch } from 'redux';
import * as actions from './actions';
import { UserActions } from './types';

export async function registerUserAsync(dispatch: Dispatch<UserActions>, data: object) {
  dispatch(actions.setLoading(true));
  dispatch(actions.registerUserAction(data));
  dispatch(actions.setLoading(false));
}

export async function loginUserAsync(dispatch: Dispatch<UserActions>, data: object) {
  dispatch(actions.setLoading(true));
  dispatch(actions.loginUserAction(data));
  dispatch(actions.setLoading(false));
}

export async function updateUserAsync(dispatch: Dispatch<UserActions>, data: object) {
  dispatch(actions.setLoading(true));
  dispatch(actions.updateUserAction(data));
  dispatch(actions.setLoading(false));
}