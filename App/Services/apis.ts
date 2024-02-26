import axios from 'axios';
import {
  AddPostRequestParams,
  GetUserDataRequestParams,
  SignupRequestParams,
} from '@redux/types';
import {REACT_APP_BASE_URL_DEV} from '@env';
import {GetUserDataRequestType} from '@redux/GetUserData/GetUserDataAction';

const baseUrl = 'https://kg4yg99jv0.execute-api.ap-south-1.amazonaws.com';

export const signupApi = ({
  email,
  first_name,
  last_name,
  user_name,
  password,
  metaData,
}: SignupRequestParams): Promise<any> => {
  const params = JSON.stringify({
    email,
    first_name,
    last_name,
    user_name,
    password,
    metaData,
  });
  return axios.post(`${baseUrl}/dev/user`, params);
  // .then(response => console.log('Show res: ', response?.data))
  // .catch(err => console.log(err));
};

export const postUserDataApi = ({
  story_media,
  description,
  metadata,
}: AddPostRequestParams): Promise<any> => {
  const params = JSON.stringify({
    story_media,
    description,
    metadata,
  });
  return axios.post(`${baseUrl}/dev/manageStory`, params);
};

export const getUserDataApi = ({
  token,
}: GetUserDataRequestParams): Promise<any> => {
  return axios.get(`${baseUrl}/dev/managePublicStory`, {
    headers: {Authorization: ''},
  });
};
