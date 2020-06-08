import { Constants, UserActions, IUserState } from './types';

const init: IUserState = {
  user: {},
  loading: false
};

export function userReducer(state: IUserState = init, action: UserActions): IUserState {
  switch (action.type) {
    case Constants.REGISTER_USER:
      return {...state, ...action.payload};
    case Constants.LOGIN_USER:
      return {...state, ...action.payload};
    case Constants.UPDATTE_USER:
      return {...state, ...action.payload};
    case Constants.SET_LOADING:
      return {...state, ...action.payload};
    default:
      return state;
  }
}