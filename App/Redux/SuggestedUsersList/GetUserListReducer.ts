import {GetUserActions} from './GetUserListAction';
import {GetUserListActionTypes} from './GetUserListConstants';
import {UserList} from './GetUserListTypes';

export interface GetUserListStateType {
  fetching: boolean;
  errorMsg: string;
  isAuthorized: boolean;
  isError: boolean;
  data?: UserList[];
}

export const InitialState: GetUserListStateType = {
  fetching: false,
  errorMsg: '',
  isAuthorized: false,
  isError: false,
};

export default function GetUserListReducer(
  state = InitialState,
  action: GetUserActions,
): GetUserListStateType {
  switch (action.type) {
    case GetUserListActionTypes.GetUserListRequest:
      return {
        ...state,
        fetching: true,
      };

    case GetUserListActionTypes.GetUserListSuccess:
      return {
        ...state,
        fetching: false,
        isError: false,
        isAuthorized: true,
        data: action?.resPayload,
        errorMsg: '',
      };

    case GetUserListActionTypes.GetUserListFailure:
      return {
        ...state,
        fetching: false,
        isError: true,
        errorMsg: action?.payload?.message,
        isAuthorized: false,
      };

    case GetUserListActionTypes.GetUserListReset:
      return {
        ...state,
        isError: false,
        data: [],
      };

    default:
      return state;
  }
}
