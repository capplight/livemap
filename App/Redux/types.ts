export interface SignUpRequestParams {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
}

export interface SignInRequestParams {
  email: string;
  password: string;
}

export interface SignInSuccessParams {
  token?: any;
}

export interface SignInFailureParams {
  message?: string;
  data?: any;
}
