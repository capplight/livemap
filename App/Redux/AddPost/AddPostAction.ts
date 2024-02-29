import {AddPostFailureParams, AddPostSuccessParams} from '@redux/types';
import {AddPostActionTypes} from './AddPostConstants';

export interface AddPostRequestType {
  token: any;
  story_media: string;
  description: string;
  metadata: any;
}

export interface AddPostSuccessType {
  type: typeof AddPostActionTypes.AddPostSuccess;
  payload: AddPostSuccessParams;
}

export interface AddPostFailureType {
  type: typeof AddPostActionTypes.AddPostFailure;
  payload: AddPostFailureParams;
}

export const AddPostRequest = (userData: AddPostRequestType) => ({
  type: AddPostActionTypes.AddPostRequest,
  payload: userData,
});

export const AddPostSuccess = ({
  message,
}: AddPostSuccessParams): AddPostSuccessType => {
  return {
    type: AddPostActionTypes.AddPostSuccess,
    payload: {message},
  };
};

export const AddPostFailed = ({
  message,
  data,
}: AddPostFailureParams): AddPostFailureType => {
  return {
    type: AddPostActionTypes.AddPostFailure,
    payload: {message, data},
  };
};

export const AddPostReset = () => ({
  type: AddPostActionTypes.AddPostReset,
});
