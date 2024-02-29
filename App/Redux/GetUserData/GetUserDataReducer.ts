import {GetUserActions} from './GetUserDataAction';
import {GetUserDataActionTypes} from './GetUserDataConstants';

export interface GetUserDataStateType {
  fetching: boolean;
  errorMsg: string;
  isAuthorized: boolean;
  isError: boolean;
  data?: any;
}

export const InitialState: GetUserDataStateType = {
  fetching: false,
  errorMsg: '',
  isAuthorized: false,
  isError: false,
};

export default function GetUserDataReducer(
  state = InitialState,
  action: GetUserActions,
): GetUserDataStateType {
  switch (action.type) {
    case GetUserDataActionTypes.GetUserDataRequest:
      return {
        ...state,
        fetching: true,
      };

    case GetUserDataActionTypes.GetUserDataSuccess:
      return {
        ...state,
        fetching: false,
        isError: false,
        isAuthorized: true,
        data: action?.resPayload,
        errorMsg: '',
      };

    case GetUserDataActionTypes.GetUserDataFailure:
      return {
        ...state,
        fetching: false,
        isError: true,
        errorMsg: action?.payload?.message,
        isAuthorized: false,
      };

    case GetUserDataActionTypes.GetUserDataReset:
      return {
        ...state,
        isError: false,
        data: [],
      };

    default:
      return state;
  }
}
