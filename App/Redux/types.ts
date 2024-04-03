import {Float} from 'react-native/Libraries/Types/CodegenTypes';

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

export interface MapData {
  userId: UserData[];
}

export interface UserData {
  _id: string;
  story_media: string;
  description: string;
  metadata: MetaData;
  user_id: UserId;
  createdAt: string;
  updatedAt: string;
}

export interface UserId {
  user_id: {
    _id: string;
    metaData: MetaData;
    email: string;
  };
}
export interface MetaData {
  latitude: any;
  longitude: any;
  latitudeDelta: 0.0922;
  longitudeDelta: 0.0421;
}

export interface GetUserDataRequestParams {
  token: any;
}

export interface GetUserDataSuccessParams {
  data: MapData;
}

export interface GetUserDataFailureParams {
  message?: string;
  data?: any;
}
