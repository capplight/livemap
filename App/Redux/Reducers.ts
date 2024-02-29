import {combineReducers} from 'redux';
import SignupReducer from './Signup/SignupReducer';
import GetUserDataReducer from './GetUserData/GetUserDataReducer';
import AddPostReducer from './AddPost/AddPostReducer';

export const rootReducer = combineReducers({
  signup: SignupReducer,
  getUserData: GetUserDataReducer,
  addPost: AddPostReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
