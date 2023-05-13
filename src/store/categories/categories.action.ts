import { createAction } from 'utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from 'store/categories/categories.types';

import type { CategoriesMap } from 'types/categories';

export const setCategoriesMap = (categoriesMap: CategoriesMap) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);
