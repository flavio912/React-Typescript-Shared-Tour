import { combineReducers, createStore, Action } from 'redux';
import { userReducer } from './user/reducer';
import { dialogReducer } from './dialog/reducer';
import { virtualTourReducer } from './virtualTour/reducer';

import { IUserState, IDispatchUserAction } from './user/types';
import { IDialogState, IDispatchDialogAction } from './dialog/types';
import { IVirtualTourState, IDispatchVirtualTourAction } from './virtualTour/types';

export interface IRootState {
  user: IUserState,
  dialog: IDialogState,
  virtualTour: IVirtualTourState
}

export interface IRootDispatchAction extends Action {
  user: IDispatchUserAction,
  dialog: IDispatchDialogAction,
  virtualTour: IDispatchVirtualTourAction
}

const store = createStore<IRootState, any, any, any>(
  combineReducers({
    user: userReducer,
    dialog: dialogReducer,
    virtualTour: virtualTourReducer
  }));

export default store;