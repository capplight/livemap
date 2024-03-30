import {AxiosResponse} from 'axios';
import {StrictEffect, call, put, takeLatest} from 'redux-saga/effects';
import {getChatDetailsApi} from '../../Services/apis';
import {ChatDetailsRequest} from './ChatDetailsAction';
import {ChatDetailsActionTypes} from './ChatDetailsConstants';
import {showToast} from '@constants/constValues';
import {navigate} from '../../Navigation/RootNavigationRef';

export function* ChatDetailsSaga({
  resPayload,
}: ReturnType<typeof ChatDetailsRequest>): Generator<StrictEffect, void, any> {
  const {token, receiver_id, page, limit} = resPayload;
  try {
    const response: AxiosResponse = yield call(() =>
      getChatDetailsApi({token, receiver_id, page, limit}),
    );
    if (page === 1) {
      yield put({
        type: ChatDetailsActionTypes.ChatDetailsReset,
      });
    }
    const resPayload = response?.data;
    yield put({
      type: ChatDetailsActionTypes.ChatDetailsSuccess,
      resPayload,
    });
    // showToast('success', 'Success', 'Signed up successfully');
  } catch (error: any) {
    if (error?.response?.status === 403) {
      navigate('Login', {});
    }
    console.log(error?.response, 'error response in saga');
    yield put({
      type: ChatDetailsActionTypes.ChatDetailsFailure,
      error,
    });
    showToast('error', 'Error', error?.response?.data);
  }
}

export function* watchChatDetails() {
  yield takeLatest(ChatDetailsActionTypes.ChatDetailsRequest, ChatDetailsSaga);
}
