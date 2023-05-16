import { USER_ACTION_TYPES } from './user.types';

import type { UserInfo } from 'utils/firebase/firebase.utils';
import type { Action } from 'types/action';
import type { ValueOf } from 'types/valueof';

type UserReducerState = {
  currentUser: UserInfo | null;
};

const INITIAL_STATE: UserReducerState = {
  currentUser: null,
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
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
