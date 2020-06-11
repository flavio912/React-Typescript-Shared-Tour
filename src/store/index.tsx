import { combineReducers, createStore, Action } from 'redux';
import { userReducer } from './user/reducer';
import { dialogReducer } from './dialog/reducer';
import { IUserState, IDispatchUserAction } from './user/types';
import { IDialogState, IDispatchDialogAction } from './dialog/types';

export interface IRootState {
  user: IUserState,
  dialog: IDialogState
}

export interface IRootDispatchAction extends Action {
  user: IDispatchUserAction,
  dialog: IDispatchDialogAction
}

const store = createStore<IRootState, any, any, any>(
  combineReducers({
    user: userReducer,
    dialog: dialogReducer
  }));

export default store;