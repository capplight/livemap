import axios from 'axios';
import {
  AddPostRequestParams,
  GetUserDataRequestParams,
  SignupRequestParams,
} from '@redux/types';
import {REACT_APP_BASE_URL_DEV} from '@env';
import {ChatListRequestParams} from '@redux/ChatList/ChatListTypes';
import {ChatDetailsRequestParams} from '@redux/ChatDetails/ChatDetailsTypes';

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
  return axios.get(
    `${REACT_APP_BASE_URL_DEV}/dev/managePublicStory?state=new`,
    {
      headers: {Authorization: ''},
    },
  );
};

export const getChatListApi = ({
  token,
  page,
  limit,
}: ChatListRequestParams): Promise<any> => {
  const params = `list=true&page=${page}&limit=${limit}`;
  // console.log('Show params: ', params);
  return axios.get(`${REACT_APP_BASE_URL_DEV}/dev/message?${params}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getChatDetailsApi = ({
  token,
  receiver_id,
  page,
  limit,
}: ChatDetailsRequestParams): Promise<any> => {
  const params = `receiver_id=${receiver_id}&page=${page}&limit=${limit}`;
  // console.log('Show params: ', params);
  return axios.get(`${REACT_APP_BASE_URL_DEV}/dev/message?${params}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};
