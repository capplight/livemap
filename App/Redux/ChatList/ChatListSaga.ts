import {AxiosResponse} from 'axios';
import {StrictEffect, call, put, takeLatest} from 'redux-saga/effects';
import {getChatListApi} from '../../Services/apis';
import {ChatListRequest} from './ChatListAction';
import {ChatListActionTypes} from './ChatListConstants';
import {showToast} from '@constants/constValues';
import {navigate} from '../../Navigation/RootNavigationRef';

export function* ChatListSaga({
  resPayload,
}: ReturnType<typeof ChatListRequest>): Generator<StrictEffect, void, any> {
  const {token, page, limit} = resPayload;
  try {
    const response: AxiosResponse = yield call(() =>
      getChatListApi({token, page, limit}),
    );
    const resPayload = response?.data;
    yield put({
      type: ChatListActionTypes.ChatListReset,
    });
    yield put({
      type: ChatListActionTypes.ChatListSuccess,
      resPayload,
    });
    // showToast('success', 'Success', 'Signed up successfully');
  } catch (error: any) {
    if (error?.response?.status === 403) {
      navigate('Login', {});
    }
    console.log(error?.response, 'error response in saga');
    yield put({
      type: ChatListActionTypes.ChatListFailure,
      error,
    });
    showToast('error', 'Error', error?.response?.data?.message);
  }
}

export function* watchChatList() {
  yield takeLatest(ChatListActionTypes.ChatListRequest, ChatListSaga);
}
