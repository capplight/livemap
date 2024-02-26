import {AxiosResponse} from 'axios';
import {StrictEffect, call, put} from 'redux-saga/effects';
import {AddPostApi} from '../../Services/apis';
import {AddPostRequest} from './AddPostAction';
import {AddPostActionTypes} from './AddPostConstants';
import {showToast} from '@constants/constValues';

export function* AddPostSaga({
  payload,
}: ReturnType<typeof AddPostRequest>): Generator<StrictEffect, void, any> {
  const {story_media, description, metadata} = payload;
  try {
    const response: AxiosResponse = yield call(() =>
      AddPostApi({
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
    showToast('success', 'Success', 'Signed up successfully');
  } catch (error: any) {
    console.log(error?.message, 'error response in saga');
    yield put({
      type: AddPostActionTypes.AddPostFailure,
      error,
    });
    showToast('error', 'Error', 'Error while signing up');
  }
}
