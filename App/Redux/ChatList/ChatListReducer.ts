import {ChatListActions} from './ChatListAction';
import {ChatListActionTypes} from './ChatListConstants';
import {Users} from './ChatListTypes';

export interface ChatListStateType {
  fetching: boolean;
  errorMsg: string;
  isAuthorized: boolean;
  isError: boolean;
  data?: Users[];
}

export const InitialState: ChatListStateType = {
  fetching: false,
  errorMsg: '',
  isAuthorized: false,
  isError: false,
};

export default function ChatListReducer(
  state = InitialState,
  action: ChatListActions,
): ChatListStateType {
  switch (action.type) {
    case ChatListActionTypes.ChatListRequest:
      return {
        ...state,
        fetching: true,
      };

    case ChatListActionTypes.ChatListSuccess:
      return {
        ...state,
        fetching: false,
        isError: false,
        isAuthorized: true,
        data: action?.resPayload?.users,
        errorMsg: '',
      };

    case ChatListActionTypes.ChatListFailure:
      return {
        ...state,
        fetching: false,
        isError: true,
        errorMsg: action?.payload?.message,
        isAuthorized: false,
      };

    case ChatListActionTypes.ChatListReset:
      return {
        ...state,
        isError: false,
        data: [],
      };

    default:
      return state;
  }
}
