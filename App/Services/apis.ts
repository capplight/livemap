import axios from 'axios';
import {SignupRequestParams} from '@redux/types';
import {REACT_APP_BASE_URL_DEV} from '@env';

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

// export const getCategoryListApi = ({
//   page,
//   limit,
//   search,
// }: CategoryListRequestParams): Promise<any> => {
//   const params = search
//     ? `page=${page}&limit=${limit}&search=${search}`
//     : `page=${page}&limit=${limit}`;
//   return axios.get(`/inventory_category/inventory_category_list?${params}`);
// };
