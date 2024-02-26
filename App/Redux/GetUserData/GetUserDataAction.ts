import {
  GetUserDataFailureParams,
  GetUserDataRequestParams,
  GetUserDataSuccessParams,
} from '@redux/types';
import {GetUserDataActionTypes} from './GetUserDataConstants';

export interface GetUserDataRequestType {
  type: typeof GetUserDataActionTypes.GetUserDataRequest;
  payload: GetUserDataRequestParams;
}

export interface GetUserDataSuccessType {
  type: typeof GetUserDataActionTypes.GetUserDataSuccess;
  payload: GetUserDataSuccessParams;
}

export interface GetUserDataFailureType {
  type: typeof GetUserDataActionTypes.GetUserDataFailure;
  payload: GetUserDataFailureParams;
}

export interface GetUserDataResetType {
  type: typeof GetUserDataActionTypes.GetUserDataReset;
}

export const GetUserDataRequest = ({token}: GetUserDataRequestParams) => ({
  type: GetUserDataActionTypes.GetUserDataRequest,
  payload: {token},
});

export const GetUserDataSuccess = ({
  data,
}: GetUserDataSuccessParams): GetUserDataSuccessType => {
  return {
    type: GetUserDataActionTypes.GetUserDataSuccess,
    payload: {data},
  };
};

export const GetUserDataFailed = ({
  message,
  data,
}: GetUserDataFailureParams): GetUserDataFailureType => {
  return {
    type: GetUserDataActionTypes.GetUserDataFailure,
    payload: {message, data},
  };
};

export const GetUserDataReset = () => ({
  type: GetUserDataActionTypes.GetUserDataReset,
});

export type GetUserActions =
  | GetUserDataRequestType
  | GetUserDataSuccessType
  | GetUserDataFailureType
  | GetUserDataResetType;
