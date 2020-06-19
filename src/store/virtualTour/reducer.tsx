import { Reducer } from 'redux';
import { Constants, IVirtualTourState, IDispatchVirtualTourAction } from './types';

export const initVirtualTour: IVirtualTourState = {
  socket: null,
  connection: null
};

export const virtualTourReducer: Reducer<IVirtualTourState, IDispatchVirtualTourAction> = (state = initVirtualTour, action) => {
  switch (action.type) {
    case Constants.SET_SOCKET:
      return {...state, ...action.payload};
    case Constants.SET_TWILIO_CONNECTION:
      return {...state, ...action.payload};  
    default:
      return state;
  }
}