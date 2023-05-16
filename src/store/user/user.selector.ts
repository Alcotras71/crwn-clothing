import { createSelector } from 'reselect';

import type { RootState } from 'types/store-types';

const selectUserReducer = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  user => user.currentUser
);
