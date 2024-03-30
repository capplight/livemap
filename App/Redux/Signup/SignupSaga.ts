import {AxiosResponse} from 'axios';
import {StrictEffect, call, put} from 'redux-saga/effects';
import {signupApi} from '../../Services/apis';
import {SignupRequest} from './SignupAction';
import {SignupActionTypes} from './SignupConstants';
import {showToast} from '@constants/constValues';

export function* signupSaga({
  payload,
}: ReturnType<typeof SignupRequest>): Generator<StrictEffect, void, any> {
  const {email, first_name, last_name, user_name, password, metaData} = payload;
  try {
    const response: AxiosResponse = yield call(() =>
      signupApi({
        email,
        first_name,
        last_name,
        user_name,
        password,
        metaData,
      }),
    );
    const resPayload = response?.data;
    yield put({
      type: SignupActionTypes.SignupReset,
    });
    yield put({
      type: SignupActionTypes.SignupSuccess,
      resPayload,
    });
    showToast('success', 'Success', 'Signed up successfully');
  } catch (error: any) {
    // const errorResponse = error.toJSON();
    console.log(error?.message, 'error response in saga');
    // console.log(errorResponse, 'error response in saga');
    yield put({
      type: SignupActionTypes.SignupFailure,
      error,
    });
    showToast('error', 'Error', 'Error while signing up');
  }
}
