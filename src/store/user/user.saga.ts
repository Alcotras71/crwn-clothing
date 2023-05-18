import { takeLatest, put, all, call } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from 'store/user/user.types';
import { signInSuccess, signInFailed } from 'store/user/user.action';
import {
  getCurrentUser,
  UserInfo,
  createUserDocumentFromAuth,
} from 'utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(
  userAuth: UserInfo,
  additionalDetails?: { email: string; password: string }
) {
  try {
    const userSnapshot: Awaited<ReturnType<typeof createUserDocumentFromAuth>> =
      yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
    yield put(
      signInSuccess({
        id: userSnapshot?.id,
        ...(userSnapshot?.data() as UserInfo),
      })
    );
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth: UserInfo | null = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
  yield all([call(onCheckUserSession)]);
}
