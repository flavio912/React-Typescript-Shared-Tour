import { action } from 'typesafe-actions';
import { Constants } from './types';

export const setSocketAction = (socket: any) => {
  return action(Constants.SET_SOCKET, { socket });
}

export const setTwilioConnectionAction = (connection: any) => {
  return action(Constants.SET_TWILIO_CONNECTION, { connection });
}

export const setTourAction = (tour: any) => {
  return action(Constants.SET_TOUR, { tour });
}