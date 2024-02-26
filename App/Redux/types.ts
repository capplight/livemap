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

export interface AddPostRequestParams {
  story_media: string;
  description: string;
  metadata: any;
}

export interface AddPostSuccessParams {
  message?: string;
}

export interface AddPostFailureParams {
  message?: string;
  data?: any;
}

export interface UserData {
  _id: string;
  story_media: string;
  description: string;
  user_id: string;
  metadata: MetaData;
  createdAt: string;
  updatedAt: string;
}

export interface MetaData {
  latitude: any;
  latitudeDelta: any;
  longitude: any;
  longitudeDelta: any;
}

export interface GetUserDataRequestParams {
  token: any;
}

export interface GetUserDataSuccessParams {
  data: [];
}

export interface GetUserDataFailureParams {
  message?: string;
  data?: any;
}
