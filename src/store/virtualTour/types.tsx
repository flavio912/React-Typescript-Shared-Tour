import { Action } from 'redux';

export interface IVirtualTourState {
  socket: any,
  socketCode: any,
  twilioConnection: any,
  tourControl: any,
  tourSession: any
}

export interface IDispatchVirtualTourAction extends Action {
  payload?: any;
}

export enum Constants {
  SET_SOCKET = 'set_socket',
  SET_SOCKET_CODE = 'set_socket_code',
  SET_TWILIO_CONNECTION = 'set_twilio_connection',
  SET_TOUR_CONTROL = 'set_tour_control',
  SET_TOUR_SESSION = 'set_tour_session'
}
