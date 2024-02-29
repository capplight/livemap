import {all, fork, takeLatest} from 'redux-saga/effects';
import {signupSaga} from './Signup/SignupSaga';
import {SignupActionTypes} from './Signup/SignupConstants';
import {watchGetUserDataList} from './GetUserData/GetUserDataSaga';
import {watchAddPost} from './AddPost/AddPostSaga';

export default function* rootSagas() {
  yield all([takeLatest(SignupActionTypes.SignupRequest, signupSaga)]);
  yield all([fork(watchGetUserDataList)]);
  yield all([fork(watchAddPost)]);
}
