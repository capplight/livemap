export interface SignupRequestParams {
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
  password: string;
  metaData: any;
}

export interface SignupSuccessParams {
  data?: any;
}

export interface SignupFailureParams {
  message?: string;
  data?: any;
}
