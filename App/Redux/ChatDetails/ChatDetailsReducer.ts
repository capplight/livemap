import {ChatDetailsActions} from './ChatDetailsAction';
import {ChatDetailsActionTypes} from './ChatDetailsConstants';
import {ChatHistory} from './ChatDetailsTypes';

export interface ChatDetailsStateType {
  fetching: boolean;
  errorMsg: string;
  isAuthorized: boolean;
  isError: boolean;
  data?: any;
}

export const InitialState: ChatDetailsStateType = {
  fetching: false,
  errorMsg: '',
  isAuthorized: false,
  isError: false,
  data: [],
};

export default function ChatDetailsReducer(
  state = InitialState,
  action: ChatDetailsActions,
): ChatDetailsStateType {
  switch (action.type) {
    case ChatDetailsActionTypes.ChatDetailsRequest:
      return {
        ...state,
        fetching: true,
      };

    case ChatDetailsActionTypes.ChatDetailsSuccess:
      return {
        ...state,
        fetching: false,
        isError: false,
        isAuthorized: true,
        data: action?.resPayload,
        errorMsg: '',
      };

    case ChatDetailsActionTypes.ChatDetailsFailure:
      console.log('Error getting user details');
      return {
        ...state,
        fetching: false,
        isError: true,
        errorMsg: action?.payload?.message,
        isAuthorized: false,
      };

    case ChatDetailsActionTypes.ChatDetailsReset:
      return {
        ...state,
        isError: false,
        data: [],
      };

    default:
      return state;
  }
}
