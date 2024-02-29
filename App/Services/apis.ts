import axios from 'axios';
import {
  AddPostRequestParams,
  GetUserDataRequestParams,
  SignupRequestParams,
} from '@redux/types';
import {REACT_APP_BASE_URL_DEV} from '@env';

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
  return axios.post(`${REACT_APP_BASE_URL_DEV}/dev/user`, params);
  // .then(response => console.log('Show res: ', response?.data))
  // .catch(err => console.log(err));
};

export const postUserDataApi = ({
  token,
  story_media,
  description,
  metadata,
}: AddPostRequestParams): Promise<any> => {
  const params = JSON.stringify({
    story_media,
    description,
    metadata,
  });
  return axios.post(`${REACT_APP_BASE_URL_DEV}/dev/manageStory`, params, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getUserDataApi = ({
  token,
}: GetUserDataRequestParams): Promise<any> => {
  return axios.get(`${REACT_APP_BASE_URL_DEV}/dev/managePublicStory`, {
    headers: {Authorization: ''},
  });
};
