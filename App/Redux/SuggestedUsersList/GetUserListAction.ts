import {
  GetUserListFailureParams,
  GetUserListRequestParams,
  GetUserListSuccessParams,
} from './GetUserListTypes';
import {GetUserListActionTypes} from './GetUserListConstants';

export interface GetUserListRequestType {
  type: typeof GetUserListActionTypes.GetUserListRequest;
  payload: GetUserListRequestParams;
}

export interface GetUserListSuccessType {
  type: typeof GetUserListActionTypes.GetUserListSuccess;
  payload: GetUserListSuccessParams;
}

export interface GetUserListFailureType {
  type: typeof GetUserListActionTypes.GetUserListFailure;
  payload: GetUserListFailureParams;
}

export interface GetUserListResetType {
  type: typeof GetUserListActionTypes.GetUserListReset;
}

export const GetUserListRequest = ({token}: GetUserListRequestParams) => ({
  type: GetUserListActionTypes.GetUserListRequest,
  payload: {token},
});

export const GetUserListSuccess = ({
  data,
}: GetUserListSuccessParams): GetUserListSuccessType => {
  return {
    type: GetUserListActionTypes.GetUserListSuccess,
    payload: {data},
  };
};

export const GetUserListFailed = ({
  message,
  data,
}: GetUserListFailureParams): GetUserListFailureType => {
  return {
    type: GetUserListActionTypes.GetUserListFailure,
    payload: {message, data},
  };
};

export const GetUserListReset = () => ({
  type: GetUserListActionTypes.GetUserListReset,
});

export type GetUserActions =
  | GetUserListRequestType
  | GetUserListSuccessType
  | GetUserListFailureType
  | GetUserListResetType;
