import {AxiosResponse} from 'axios';
import {StrictEffect, call, put, takeLatest} from 'redux-saga/effects';
import {getUserListApi} from '../../Services/apis';
import {GetUserListRequest} from './GetUserListAction';
import {GetUserListActionTypes} from './GetUserListConstants';
import {showToast} from '@constants/constValues';
import {navigate} from '../../Navigation/RootNavigationRef';

export function* GetUserListSaga({
  payload,
}: ReturnType<typeof GetUserListRequest>): Generator<StrictEffect, void, any> {
  const {token} = payload;
  try {
    const response: AxiosResponse = yield call(() => getUserListApi({token}));
    const resPayload = response?.data;
    yield put({
      type: GetUserListActionTypes.GetUserListReset,
    });
    yield put({
      type: GetUserListActionTypes.GetUserListSuccess,
      resPayload,
    });
    // showToast('success', 'Success', 'Signed up successfully');
  } catch (error: any) {
    if (error?.response?.status === 403) {
      navigate('Login', {});
    }
    console.log(error?.response, 'error response in saga');
    yield put({
      type: GetUserListActionTypes.GetUserListFailure,
      error,
    });
    showToast('error', 'Error', error?.message);
  }
}

export function* watchGetUserList() {
  yield takeLatest(GetUserListActionTypes.GetUserListRequest, GetUserListSaga);
}
