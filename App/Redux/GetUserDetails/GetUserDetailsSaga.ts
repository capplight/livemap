import {AxiosResponse} from 'axios';
import {StrictEffect, call, put, takeLatest} from 'redux-saga/effects';
import {getUserDetailsApi} from '../../Services/apis';
import {GetUserDetailsRequest} from './GetUserDetailsAction';
import {GetUserDetailsActionTypes} from './GetUserDetailsConstants';
import {showToast} from '@constants/constValues';
import {navigate} from '../../Navigation/RootNavigationRef';

export function* GetUserDetailsSaga({
  payload,
}: ReturnType<typeof GetUserDetailsRequest>): Generator<
  StrictEffect,
  void,
  any
> {
  const {token} = payload;
  try {
    const response: AxiosResponse = yield call(() =>
      getUserDetailsApi({token}),
    );
    const resPayload = response?.data;
    yield put({
      type: GetUserDetailsActionTypes.GetUserDetailsReset,
    });
    yield put({
      type: GetUserDetailsActionTypes.GetUserDetailsSuccess,
      resPayload,
    });
    // showToast('success', 'Success', 'Signed up successfully');
  } catch (error: any) {
    if (error?.response?.status === 403) {
      navigate('Login', {});
    }
    console.log(error?.response, 'error response in saga');
    yield put({
      type: GetUserDetailsActionTypes.GetUserDetailsFailure,
      error,
    });
    showToast('error', 'Error', error?.message);
  }
}

export function* watchGetUserDetailsList() {
  yield takeLatest(
    GetUserDetailsActionTypes.GetUserDetailsRequest,
    GetUserDetailsSaga,
  );
}
