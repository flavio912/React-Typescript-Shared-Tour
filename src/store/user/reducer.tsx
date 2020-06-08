import { Constants, UserActions, IUserState } from './types';
// import RequestHelper from '../../utils/Request.Utils';

const init: IUserState = {
  user: {},
  loading: false
};

export function userReducer(state: IUserState = init, action: UserActions): IUserState {
  switch (action.type) {
    case Constants.REGISTER_USER:{      
      // RequestHelper.setToken(action.payload.data.token)
      return {...state, ...action.payload};
    }
    case Constants.LOGIN_USER:{      
      // RequestHelper.setToken(action.payload.data.token)
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