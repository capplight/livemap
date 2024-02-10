import {AxiosResponse} from 'axios';
import {call, put} from 'redux-saga/effects';
import {signInApi} from '../../Services/authApi';
// import {ToastType} from '@components/CustomToast/ToastProps';
import {LoginActionTypes} from './LoginConstants';

export function* loginSaga(action: any) {
  try {
    const response: AxiosResponse = yield call(signInApi, action?.payload);
    const resPayload = response?.data;
    yield put({
      type: LoginActionTypes.LoginReset,
    });
    yield put({
      type: LoginActionTypes.LoginSuccess,
      resPayload,
    });
    // yield put({
    //   type: CustomToastActionTypes.CustomToastRequest,
    //   toast: {
    //     message: 'login Success',
    //     apperance: ToastType.Success,
    //   },
    // });
  } catch (error: any) {
    // const errorResponse = error.toJSON();

    // console.log(error?.message, 'error response in saga');
    yield put({
      type: LoginActionTypes.LoginFailure,
      error,
    });
    // yield put({
    //   type: CustomToastActionTypes.CustomToastRequest,
    //   toast: {
    //     message: error?.message,
    //     apperance: ToastType.Error,
    //   },
    // });
  }
}
