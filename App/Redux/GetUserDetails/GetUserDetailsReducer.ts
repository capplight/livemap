import {GetUserActions} from './GetUserDetailsAction';
import {GetUserDetailsActionTypes} from './GetUserDetailsConstants';
import {UserDetails} from './GetUserDetailsTypes';

export interface GetUserDetailsStateType {
  fetching: boolean;
  errorMsg: string;
  isAuthorized: boolean;
  isError: boolean;
  data?: UserDetails[];
}

export const InitialState: GetUserDetailsStateType = {
  fetching: false,
  errorMsg: '',
  isAuthorized: false,
  isError: false,
};

export default function GetUserDetailsReducer(
  state = InitialState,
  action: GetUserActions,
): GetUserDetailsStateType {
  switch (action.type) {
    case GetUserDetailsActionTypes.GetUserDetailsRequest:
      return {
        ...state,
        fetching: true,
      };

    case GetUserDetailsActionTypes.GetUserDetailsSuccess:
      return {
        ...state,
        fetching: false,
        isError: false,
        isAuthorized: true,
        data: action?.resPayload,
        errorMsg: '',
      };

    case GetUserDetailsActionTypes.GetUserDetailsFailure:
      return {
        ...state,
        fetching: false,
        isError: true,
        errorMsg: action?.payload?.message,
        isAuthorized: false,
      };

    case GetUserDetailsActionTypes.GetUserDetailsReset:
      return {
        ...state,
        isError: false,
        data: [],
      };

    default:
      return state;
  }
}
