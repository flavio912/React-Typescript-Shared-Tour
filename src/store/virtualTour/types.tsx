import { Action } from 'redux';

export interface IVirtualTourState {
  socket: any,
  connection: any
}

export interface IDispatchVirtualTourAction extends Action {
  payload?: any;
}

export enum Constants {
  SET_SOCKET = 'set_socket',
  SET_TWILIO_CONNECTION = 'set_twilio_connection'
}
