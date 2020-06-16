import { Reducer } from 'redux';
import { Constants, IUserState, IDispatchUserAction } from './types';
import RequestHelper from '../../utils/Request.Utils';

export const initUser: IUserState = {
  token: '',
  user: {
    email: '',
    password: '',
    name: '',
    phone: '',
    role: '',
    country: ''  
  }
};

export const userReducer: Reducer<IUserState, IDispatchUserAction> = (state = initUser, action) => {
  switch (action.type) {
    case Constants.REGISTER_USER:{
      RequestHelper.setToken(action.payload.token);
      return {...state, ...action.payload};
    }
    case Constants.LOGIN_USER:{
      RequestHelper.setToken(action.payload.token);      
      return {...state, ...action.payload};
    }
    case Constants.UPDATTE_USER:
      return {...state, ...action.payload};
    case Constants.LOGOUT_USER:{
      RequestHelper.removeToken();
      return {...state, ...initUser};
    }
    default:
      return state;
  }
}