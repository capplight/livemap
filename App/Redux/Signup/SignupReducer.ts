import {SignupActionTypes} from './SignupConstants';

export interface SignupStateType {
  fetching: boolean;
  errorMsg: string;
  isAuthorized: boolean;
  isError: boolean;
}

export const InitialState: SignupStateType = {
  fetching: false,
  errorMsg: '',
  isAuthorized: false,
  isError: false,
};

export default function SignupReducer(
  state = InitialState,
  action: any,
): SignupStateType {
  switch (action.type) {
    case SignupActionTypes.SignupRequest:
      return {
        ...state,
        fetching: true,
      };

    case SignupActionTypes.SignupSuccess:
      return {
        ...state,
        fetching: false,
        isError: false,
        isAuthorized: true,
        errorMsg: '',
      };

    case SignupActionTypes.SignupFailure:
      return {
        ...state,
        fetching: false,
        isError: true,
        errorMsg: action?.error.message,
        isAuthorized: false,
      };

    case SignupActionTypes.SignupReset:
      return {
        // ...InitialState,
        ...state,
        isError: false,
      };

    default:
      return state;
  }
}
