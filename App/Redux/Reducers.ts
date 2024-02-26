import {combineReducers} from 'redux';
import SignupReducer from './Signup/SignupReducer';
import GetUserDataReducer from './GetUserData/GetUserDataReducer';

export const rootReducer = combineReducers({
  signup: SignupReducer,
  getUserData: GetUserDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
