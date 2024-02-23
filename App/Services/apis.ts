import axios from 'axios';
import {SignInRequestParams, SignUpRequestParams} from '@redux/types';

const baseUrl = 'https://kg4yg99jv0.execute-api.ap-south-1.amazonaws.com';

export const singInUser = ({
  email,
  password,
}: SignInRequestParams): Promise<any> => {
  const params = JSON.stringify({
    email,
    password,
  });
  return axios.post(`${baseUrl}/dev/manageOauth`, params);
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
