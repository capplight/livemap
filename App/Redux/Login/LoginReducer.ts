import {LoginActionTypes} from './LoginConstants';

export interface LoginStateType {
  fetching: boolean;
  errorMsg: string;
  isAuthorized: boolean;
  isError: boolean;
}

export const InitialState: LoginStateType = {
  fetching: false,
  errorMsg: '',
  isAuthorized: false,
  isError: false,
};

export default function loginReducer(
  state = InitialState,
  action: any,
): LoginStateType {
  switch (action.type) {
    case LoginActionTypes.LoginRequest:
      return {
        ...state,
        fetching: true,
      };

    case LoginActionTypes.LoginSuccess:
      return {
        ...state,
        fetching: false,
        isError: false,
        isAuthorized: true,
        errorMsg: '',
      };

    case LoginActionTypes.LoginFailure:
      return {
        ...state,
        fetching: false,
        isError: true,
        errorMsg: action?.error.message,
        isAuthorized: false,
      };

    case LoginActionTypes.LoginReset:
      return {
        // ...InitialState,
        ...state,
        isError: false,
      };

    default:
      return state;
  }
}
