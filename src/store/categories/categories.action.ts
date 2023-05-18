import { createAction } from 'utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from 'store/categories/categories.types';

import type { CategoryInterface } from 'types/categories';

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories: CategoryInterface[]) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error: unknown) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
