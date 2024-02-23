import {SignInFailureParams, SignInSuccessParams} from '@redux/types';
import {LoginActionTypes} from './LoginConstants';

export interface SignInRequestType {
  email: string;
  password: string;
}

export interface LoginSuccessType {
  type: typeof LoginActionTypes.LoginSuccess;
  payload: SignInSuccessParams;
}

export interface LoginFailureType {
  type: typeof LoginActionTypes.LoginFailure;
  payload: SignInFailureParams;
}

export const LoginRequest = (userData: SignInRequestType) => ({
  type: LoginActionTypes.LoginRequest,
  payload: userData,
});

export const LoginReset = () => ({
  type: LoginActionTypes.LoginReset,
});

export const LoginSuccess = ({
  token,
}: SignInSuccessParams): LoginSuccessType => {
  return {
    type: LoginActionTypes.LoginSuccess,
    payload: {token},
  };
};

export const LoginFailed = ({
  message,
  data,
}: SignInFailureParams): LoginFailureType => {
  return {
    type: LoginActionTypes.LoginFailure,
    payload: {message, data},
  };
};
