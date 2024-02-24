import {SignupFailureParams, SignupSuccessParams} from '@redux/types';
import {SignupActionTypes} from './SignupConstants';

export interface SignupRequestType {
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
  password: string;
  metaData: any;
}

export interface SignupSuccessType {
  type: typeof SignupActionTypes.SignupSuccess;
  payload: SignupSuccessParams;
}

export interface SignupFailureType {
  type: typeof SignupActionTypes.SignupFailure;
  payload: SignupFailureParams;
}

export const SignupRequest = (userData: SignupRequestType) => ({
  type: SignupActionTypes.SignupRequest,
  payload: userData,
});

export const SignupSuccess = ({
  data,
}: SignupSuccessParams): SignupSuccessType => {
  return {
    type: SignupActionTypes.SignupSuccess,
    payload: {data},
  };
};

export const SignupFailed = ({
  message,
  data,
}: SignupFailureParams): SignupFailureType => {
  return {
    type: SignupActionTypes.SignupFailure,
    payload: {message, data},
  };
};

export const SignupReset = () => ({
  type: SignupActionTypes.SignupReset,
});
