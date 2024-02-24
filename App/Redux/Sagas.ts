import {all, fork, takeLatest} from 'redux-saga/effects';
import {signupSaga} from './Signup/SignupSaga';
import {SignupActionTypes} from './Signup/SignupConstants';

export default function* rootSagas() {
  yield all([takeLatest(SignupActionTypes.SignupRequest, signupSaga)]);
  // yield all([fork(watchOrderListSaga)]);
  // yield all([fork(watchOrderDetailsSaga)]);
  // yield all([fork(watchPostOrderProgressSaga)]);
  // yield all([fork(watchGetCategoryList)]);
  // yield all([fork(watchPostOrderDetail)]);
  // yield all([fork(watchPostToolItem)]);
  // yield all([fork(watchGetKarigarList)]);
  // yield all([fork(watchPostAssignList)]);
  // yield all([fork(watchGetDropDownList)]);
  // yield all([fork(watchUserProfileSaga)]);
}
