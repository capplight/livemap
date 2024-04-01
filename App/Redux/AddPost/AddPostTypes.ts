import {MetaData} from '@redux/types';

export interface AddPostRequestParams {
  token: string;
  story_media: string;
  description: string;
  metadata: MetaData;
}

export interface AddPostSuccessParams {
  message?: string;
}

export interface AddPostFailureParams {
  message?: string;
  data?: any;
}
