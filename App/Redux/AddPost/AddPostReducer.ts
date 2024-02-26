import {AddPostActionTypes} from './AddPostConstants';

export interface AddPostStateType {
  fetching: boolean;
  errorMsg: string;
  isAuthorized: boolean;
  isError: boolean;
}

export const InitialState: AddPostStateType = {
  fetching: false,
  errorMsg: '',
  isAuthorized: false,
  isError: false,
};

export default function AddPostReducer(
  state = InitialState,
  action: any,
): AddPostStateType {
  switch (action.type) {
    case AddPostActionTypes.AddPostRequest:
      return {
        ...state,
        fetching: true,
      };

    case AddPostActionTypes.AddPostSuccess:
      return {
        ...state,
        fetching: false,
        isError: false,
        isAuthorized: true,
        errorMsg: '',
      };

    case AddPostActionTypes.AddPostFailure:
      return {
        ...state,
        fetching: false,
        isError: true,
        errorMsg: action?.error.message,
        isAuthorized: false,
      };

    case AddPostActionTypes.AddPostReset:
      return {
        // ...InitialState,
        ...state,
        isError: false,
      };

    default:
      return state;
  }
}
