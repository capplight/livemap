import {
  ChatListFailureParams,
  ChatListRequestParams,
  ChatListSuccessParams,
} from './ChatListTypes';
import {ChatListActionTypes} from './ChatListConstants';

export interface ChatListRequestType {
  type: typeof ChatListActionTypes.ChatListRequest;
  resPayload: ChatListRequestParams;
}

export interface ChatListSuccessType {
  type: typeof ChatListActionTypes.ChatListSuccess;
  resPayload: ChatListSuccessParams;
}

export interface ChatListFailureType {
  type: typeof ChatListActionTypes.ChatListFailure;
  resPayload: ChatListFailureParams;
}

export interface ChatListResetType {
  type: typeof ChatListActionTypes.ChatListReset;
}

export const ChatListRequest = ({
  token,
  page,
  limit,
}: ChatListRequestParams) => ({
  type: ChatListActionTypes.ChatListRequest,
  resPayload: {token, page, limit},
});

export const ChatListSuccess = ({
  data,
}: ChatListSuccessParams): ChatListSuccessType => {
  return {
    type: ChatListActionTypes.ChatListSuccess,
    resPayload: {data},
  };
};

export const ChatListFailed = ({
  message,
  data,
}: ChatListFailureParams): ChatListFailureType => {
  return {
    type: ChatListActionTypes.ChatListFailure,
    resPayload: {message, data},
  };
};

export const ChatListReset = () => ({
  type: ChatListActionTypes.ChatListReset,
});

export type ChatListActions =
  | ChatListRequestType
  | ChatListSuccessType
  | ChatListFailureType
  | ChatListResetType;
