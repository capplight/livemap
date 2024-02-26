import {AxiosResponse} from 'axios';
import {StrictEffect, call, put, takeLatest} from 'redux-saga/effects';
import {getUserDataApi} from '../../Services/apis';
import {GetUserDataRequest} from './GetUserDataAction';
import {GetUserDataActionTypes} from './GetUserDataConstants';
import {showToast} from '@constants/constValues';

export function* GetUserDataSaga({
  payload,
}: ReturnType<typeof GetUserDataRequest>): Generator<StrictEffect, void, any> {
  const {token} = payload;
  try {
    const response: AxiosResponse = yield call(() => getUserDataApi({token}));
    const resPayload = response?.data;
    yield put({
      type: GetUserDataActionTypes.GetUserDataReset,
    });
    yield put({
      type: GetUserDataActionTypes.GetUserDataSuccess,
      resPayload,
    });
    // showToast('success', 'Success', 'Signed up successfully');
  } catch (error: any) {
    console.log(error?.message, 'error response in saga');
    yield put({
      type: GetUserDataActionTypes.GetUserDataFailure,
      error,
    });
    showToast('error', 'Error', error?.message);
  }
}

export function* watchGetUserDataList() {
  yield takeLatest(GetUserDataActionTypes.GetUserDataRequest, GetUserDataSaga);
}
