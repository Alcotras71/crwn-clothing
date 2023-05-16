import { createSelector } from 'reselect';

import type { RootReducerType } from 'types/root-reducer-type';

const selectUserReducer = (state: RootReducerType) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  user => user.currentUser
);
