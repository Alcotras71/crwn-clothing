import { all, call, takeLatest, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from 'utils/firebase/firebase.utils';
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from 'store/categories/categories.action';
import { CATEGORIES_ACTION_TYPES } from 'store/categories/categories.types';

import type { CategoryInterface } from 'types/categories';

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray: CategoryInterface[] = yield call(
      getCategoriesAndDocuments
    );
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
