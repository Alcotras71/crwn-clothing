import { Dispatch } from 'redux';

import { createAction } from 'utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from 'store/categories/categories.types';

import type { CategoryInterface } from 'types/categories';
import { getCategoriesAndDocuments } from 'utils/firebase/firebase.utils';

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories: CategoryInterface[]) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error: unknown) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch: Dispatch) => {
  dispatch(fetchCategoriesStart());

  try {
    const categoriesArray = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
};
