import { Reducer } from 'redux';
import { Constants, IVirtualTourState, IDispatchVirtualTourAction } from './types';
import * as CONSTANT from '../../constants';

export const initVirtualTour: IVirtualTourState = {
  socket: null,
  socketCode: null,
  twilioConnection: null,
  tourControl: null,
  tourSession: null,
  controller: null
};

export const virtualTourReducer: Reducer<IVirtualTourState, IDispatchVirtualTourAction> = (state = initVirtualTour, action) => {
  switch (action.type) {
    case Constants.SET_SOCKET:
      return {...state, ...action.payload};
    case Constants.SET_SOCKET_CODE:
      return {...state, ...action.payload};
    case Constants.SET_TWILIO_CONNECTION:
      return {...state, ...action.payload};
    case Constants.SET_TOUR_CONTROL:
      return {...state, ...action.payload};
    case Constants.SET_TOUR_SESSION:
        return {...state, ...action.payload};
    case Constants.SET_TOUR_CONTROLLER:{
      return {...state, ...action.payload};
    }  
    default:
      return state;
  }
}