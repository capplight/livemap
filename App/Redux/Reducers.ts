import {combineReducers} from 'redux';
import SignupReducer from './Signup/SignupReducer';

export const rootReducer = combineReducers({
  signup: SignupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
