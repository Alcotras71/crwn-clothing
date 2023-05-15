import { USER_ACTION_TYPES } from 'store/user/user.types';
import { CATEGORIES_ACTION_TYPES } from 'store/categories/categories.types';

import type { CategoryInterface } from 'types/categories';
import type { Action } from 'types/action';
import type { ValueOf } from 'types/valueof';

export type CategoriesReducerState = {
  categories: CategoryInterface[];
};

export const INITIAL_STATE: CategoriesReducerState = {
  categories: [],
};

export const categoriesReducer = (
  state = INITIAL_STATE,
  action: Action<
    ValueOf<typeof USER_ACTION_TYPES>,
    CategoriesReducerState['categories']
  >
): CategoriesReducerState => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
