import { Reducer } from 'redux';
import { Constants, IUserState, IDispatchUserAction } from './types';
import RequestHelper from '../../utils/Request.Utils';

const initUser: IUserState = {
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
      RequestHelper.setMe(action.payload.user);
      return {...state, ...action.payload};
    }
    case Constants.LOGIN_USER:{
      RequestHelper.setToken(action.payload.token);
      RequestHelper.setMe(action.payload.user);
      return {...state, ...action.payload};
    }
    case Constants.UPDATTE_USER:
      return {...state, ...action.payload};
    case Constants.GET_USER_INFO: {
      RequestHelper
        .get('/users/me', {})
        .then((res) => {
          return {...state, ...action.payload};
        })
        .catch(error => console.log(error));
    }
    default:
      return state;
  }
}