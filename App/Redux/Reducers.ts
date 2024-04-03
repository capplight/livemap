import {combineReducers} from 'redux';
import SignupReducer from './Signup/SignupReducer';
import GetUserDataReducer from './GetUserData/GetUserDataReducer';
import AddPostReducer from './AddPost/AddPostReducer';
import ChatListReducer from './ChatList/ChatListReducer';
import ChatDetailsReducer from './ChatDetails/ChatDetailsReducer';
import GetUserDetailsReducer from './GetUserDetails/GetUserDetailsReducer';
import GetUserListReducer from './SuggestedUsersList/GetUserListReducer';

export const rootReducer = combineReducers({
  signup: SignupReducer,
  getUserData: GetUserDataReducer,
  addPost: AddPostReducer,
  chatList: ChatListReducer,
  chatDetails: ChatDetailsReducer,
  getUserDetails: GetUserDetailsReducer,
  getUserList: GetUserListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
