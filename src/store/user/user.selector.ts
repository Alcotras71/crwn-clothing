import { rootReducer } from 'store/root-reducer';
import { createSelector } from 'reselect';

const selectUserReducer = (state: ReturnType<typeof rootReducer>) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  user => user.currentUser
);
