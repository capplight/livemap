import {AxiosResponse} from 'axios';
import {StrictEffect, call, put} from 'redux-saga/effects';
import {LoginActionTypes} from './LoginConstants';
import {singInUser} from '../../Services/apis';
import {LoginRequest} from './LoginAction';

export function* loginSaga({
  payload,
}: ReturnType<typeof LoginRequest>): Generator<StrictEffect, void, any> {
  const {email, password} = payload;
  try {
    const response: AxiosResponse = yield call(() =>
      singInUser({
        email,
        password,
      }),
    );
    const resPayload = response?.data;
    yield put({
      type: LoginActionTypes.LoginReset,
    });
    yield put({
      type: LoginActionTypes.LoginSuccess,
      resPayload,
    });
  } catch (error: any) {
    // const errorResponse = error.toJSON();
    console.log(error?.message, 'error response in saga');
    // console.log(errorResponse, 'error response in saga');
    // yield put({
    //   type: LoginActionTypes.LoginFailure,
    //   error,
    // });
  }
}
