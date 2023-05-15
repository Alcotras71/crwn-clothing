import { createAction } from 'utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES } from 'store/categories/categories.types';

import type { CategoryInterface } from 'types/categories';

export const setCategories = (categories: CategoryInterface[]) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
