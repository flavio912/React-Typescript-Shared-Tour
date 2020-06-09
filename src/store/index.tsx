import { combineReducers, createStore, Action } from 'redux';
import { userReducer } from './user/reducer';
import { IUserState, IDispatchUserAction } from './user/types';

export interface IRootState {
  user: IUserState
}

export interface IRootDispatchAction extends Action {
  user: IDispatchUserAction
}

const store = createStore<IRootState, any, any, any>(
  combineReducers({
    user: userReducer
  }));

export default store;