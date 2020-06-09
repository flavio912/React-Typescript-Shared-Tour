import { Reducer } from 'redux';
import { Constants, IUserState, IDispatchUserAction } from './types';
import RequestHelper from '../../utils/Request.Utils';

const initUser: IUserState = {
  email: '',
  password: '',
  name: '',
  phone: '',
  role: '',
  country: ''
};

export const userReducer: Reducer<IUserState, IDispatchUserAction> = (state = initUser, action) => {
  switch (action.type) {
    case Constants.REGISTER_USER:{
      RequestHelper.setToken(action.payload.data.token)
      return {...state, ...action.payload.data.user};
    }
    case Constants.LOGIN_USER:{
      console.log(action.payload.data.user);
      RequestHelper.setToken(action.payload.data.token)
      return {...state, ...action.payload};
    }
    case Constants.UPDATTE_USER:
      return {...state, ...action.payload};
    case Constants.SET_LOADING:
      return {...state, ...action.payload};
    default:
      return state;
  }
}