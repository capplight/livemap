import {AxiosResponse} from 'axios';
import {StrictEffect, call, put, takeLatest} from 'redux-saga/effects';
import {postUserDataApi} from '../../Services/apis';
import {AddPostRequest} from './AddPostAction';
import {AddPostActionTypes} from './AddPostConstants';
import {showToast} from '@constants/constValues';

export function* AddPostSaga({
  payload,
}: ReturnType<typeof AddPostRequest>): Generator<StrictEffect, void, any> {
  const {token, story_media, description, metadata} = payload;
  try {
    const response: AxiosResponse = yield call(() =>
      postUserDataApi({
        token,
        story_media,
        description,
        metadata,
      }),
    );
    const resPayload = response?.data;
    yield put({
      type: AddPostActionTypes.AddPostReset,
    });
    yield put({
      type: AddPostActionTypes.AddPostSuccess,
      resPayload,
    });
    showToast('success', 'Success', 'Added post successfully');
  } catch (error: any) {
    console.log(error?.message, 'error response in saga');
    yield put({
      type: AddPostActionTypes.AddPostFailure,
      error,
    });
    showToast('error', 'Error', error?.message);
  }
}

export function* watchAddPost() {
  yield takeLatest(AddPostActionTypes.AddPostRequest, AddPostSaga);
}
