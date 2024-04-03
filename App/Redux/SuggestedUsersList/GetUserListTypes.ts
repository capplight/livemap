import {MetaData} from '@redux/types';

export interface UserList {
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

export interface GetUserListRequestParams {
  token: string;
}

export interface GetUserListSuccessParams {
  data?: UserList[];
}

export interface GetUserListFailureParams {
  message?: string;
  data?: any;
}
