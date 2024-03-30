import {
  ChatDetailsFailureParams,
  ChatDetailsRequestParams,
  ChatDetailsSuccessParams,
} from './ChatDetailsTypes';
import {ChatDetailsActionTypes} from './ChatDetailsConstants';

export interface ChatDetailsRequestType {
  type: typeof ChatDetailsActionTypes.ChatDetailsRequest;
  resPayload: ChatDetailsRequestParams;
}

export interface ChatDetailsSuccessType {
  type: typeof ChatDetailsActionTypes.ChatDetailsSuccess;
  resPayload: ChatDetailsSuccessParams;
}

export interface ChatDetailsFailureType {
  type: typeof ChatDetailsActionTypes.ChatDetailsFailure;
  resPayload: ChatDetailsFailureParams;
}

export interface ChatDetailsResetType {
  type: typeof ChatDetailsActionTypes.ChatDetailsReset;
}

export const ChatDetailsRequest = ({
  token,
  receiver_id,
  page,
  limit,
}: ChatDetailsRequestParams) => ({
  type: ChatDetailsActionTypes.ChatDetailsRequest,
  resPayload: {token, receiver_id, page, limit},
});

export const ChatDetailsSuccess = ({
  data,
}: ChatDetailsSuccessParams): ChatDetailsSuccessType => {
  return {
    type: ChatDetailsActionTypes.ChatDetailsSuccess,
    resPayload: {data},
  };
};

export const ChatDetailsFailed = ({
  message,
  data,
}: ChatDetailsFailureParams): ChatDetailsFailureType => {
  return {
    type: ChatDetailsActionTypes.ChatDetailsFailure,
    resPayload: {message, data},
  };
};

export const ChatDetailsReset = () => ({
  type: ChatDetailsActionTypes.ChatDetailsReset,
});

export type ChatDetailsActions =
  | ChatDetailsRequestType
  | ChatDetailsSuccessType
  | ChatDetailsFailureType
  | ChatDetailsResetType;
