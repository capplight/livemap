import {
  GetUserDetailsFailureParams,
  GetUserDetailsRequestParams,
  GetUserDetailsSuccessParams,
} from './GetUserDetailsTypes';
import {GetUserDetailsActionTypes} from './GetUserDetailsConstants';

export interface GetUserDetailsRequestType {
  type: typeof GetUserDetailsActionTypes.GetUserDetailsRequest;
  payload: GetUserDetailsRequestParams;
}

export interface GetUserDetailsSuccessType {
  type: typeof GetUserDetailsActionTypes.GetUserDetailsSuccess;
  payload: GetUserDetailsSuccessParams;
}

export interface GetUserDetailsFailureType {
  type: typeof GetUserDetailsActionTypes.GetUserDetailsFailure;
  payload: GetUserDetailsFailureParams;
}

export interface GetUserDetailsResetType {
  type: typeof GetUserDetailsActionTypes.GetUserDetailsReset;
}

export const GetUserDetailsRequest = ({
  token,
  navigation,
}: GetUserDetailsRequestParams) => ({
  type: GetUserDetailsActionTypes.GetUserDetailsRequest,
  payload: {token, navigation},
});

export const GetUserDetailsSuccess = ({
  data,
}: GetUserDetailsSuccessParams): GetUserDetailsSuccessType => {
  return {
    type: GetUserDetailsActionTypes.GetUserDetailsSuccess,
    payload: {data},
  };
};

export const GetUserDetailsFailed = ({
  message,
  data,
}: GetUserDetailsFailureParams): GetUserDetailsFailureType => {
  return {
    type: GetUserDetailsActionTypes.GetUserDetailsFailure,
    payload: {message, data},
  };
};

export const GetUserDetailsReset = () => ({
  type: GetUserDetailsActionTypes.GetUserDetailsReset,
});

export type GetUserActions =
  | GetUserDetailsRequestType
  | GetUserDetailsSuccessType
  | GetUserDetailsFailureType
  | GetUserDetailsResetType;
