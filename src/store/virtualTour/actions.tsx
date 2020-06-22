import { action } from 'typesafe-actions';
import { Constants } from './types';

export const setSocketAction = (socket: any) => {
  return action(Constants.SET_SOCKET, { socket });
}

export const setSocketCodeAction = (socketCode: any) => {
  return action(Constants.SET_SOCKET_CODE, { socketCode });
}

export const setTwilioConnectionAction = (twilioConnection: any) => {
  return action(Constants.SET_TWILIO_CONNECTION, { twilioConnection });
}

export const setTourControlAction = (tourControl: any) => {
  return action(Constants.SET_TOUR_CONTROL, { tourControl });
}

export const setTourSessionAction = (tourSession: any) => {
  return action(Constants.SET_TOUR_SESSION, { tourSession });
}