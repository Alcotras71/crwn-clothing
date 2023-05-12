import { UserInfo } from 'utils/firebase/firebase.utils';
import { createAction } from 'utils/reducer/reducer.utils';
import { USER_ACTION_TYPES } from './user.types';

export const setCurrentUser = (user: UserInfo | null) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
