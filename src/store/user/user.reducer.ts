import { USER_ACTION_TYPES } from './user.types';

import type { Action } from 'types/action';
import type { ValueOf } from 'types/valueof';
import type { GenericState } from 'types/generic-state';
import type { UserInfoWithId } from 'types/user';

type UserReducerState = GenericState<{
  currentUser: UserInfoWithId | null;
}>;

const INITIAL_STATE: UserReducerState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = INITIAL_STATE,
  action: Action<
    ValueOf<typeof USER_ACTION_TYPES>,
    UserReducerState['currentUser']
  >
) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
