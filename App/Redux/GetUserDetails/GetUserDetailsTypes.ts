import {MetaData} from '@redux/types';

export interface UserDetails {
  _id: string;
  role: string;
  first_name: string;
  last_name: string;
  user_name: string;
  metaData: MetaData;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fcm_token: string;
}

export interface GetUserDetailsRequestParams {
  token: string;
}

export interface GetUserDetailsSuccessParams {
  data?: UserDetails[];
}

export interface GetUserDetailsFailureParams {
  message?: string;
  data?: any;
}
