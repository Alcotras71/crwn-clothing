import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from 'store/categories/categories.saga';
import { userSaga } from 'store/user/user.saga';

export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSaga)]);
}
