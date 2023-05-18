import { USER_ACTION_TYPES } from './user.types';

import type { UserInfoWithId } from 'utils/firebase/firebase.utils';
import type { Action } from 'types/action';
import type { ValueOf } from 'types/valueof';
import type { GenericState } from 'types/generic-state';

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
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
