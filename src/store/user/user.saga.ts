import { takeLatest, put, all, call } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import { USER_ACTION_TYPES } from 'store/user/user.types';
import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  signOutSuccess,
  signOutFailed,
} from 'store/user/user.action';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from 'utils/firebase/firebase.utils';

import type { UserAdditionalInfo, UserCredential, UserInfo } from 'types/user';

export function* getSnapshotFromUserAuth(
  userAuth: UserInfo,
  additionalDetails?: UserAdditionalInfo
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

export function* signInWithGoogle() {
  try {
    const { user }: UserCredential = yield call(signInWithGooglePopup);
    if (!user) return;
    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signInWithEmail({ payload: { email, password } }: AnyAction) {
  try {
    const { user }: UserCredential = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (!user) return;
    yield call(getSnapshotFromUserAuth, user);
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

export function* signUp({
  payload: { email, password, displayName },
}: AnyAction) {
  try {
    const { user }: UserCredential = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (!user) return;
    yield put(signUpSuccess(user, { displayName }));
  } catch (err) {
    yield put(signUpFailed(err));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailed(err));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: AnyAction) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
