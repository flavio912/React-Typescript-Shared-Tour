import { combineReducers, createStore } from 'redux';
import { userReducer } from './user/reducer';
import { IUserState } from './user/types';

export interface IRootState {
  user: IUserState
}

const store = createStore<IRootState, any, any, any>(
  combineReducers({
      user: userReducer
  }));

export default store;