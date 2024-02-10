import {LoginActionTypes} from './LoginConstants';

export interface Signin {
  email: string;
  password: string;
}

export const loginRequest = (userData: Signin) => ({
  type: LoginActionTypes.LoginRequest,
  payload: userData,
});

export const loginReset = () => ({
  type: LoginActionTypes.LoginReset,
});
