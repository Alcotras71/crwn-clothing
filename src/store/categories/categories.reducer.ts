import { USER_ACTION_TYPES } from 'store/user/user.types';
import { CATEGORIES_ACTION_TYPES } from 'store/categories/categories.types';

import type { CategoryInterface } from 'types/categories';
import type { Action } from 'types/action';
import type { ValueOf } from 'types/valueof';
import type { GenericState } from 'types/generic-state';

export type CategoriesReducerState = GenericState<{
  categories: CategoryInterface[];
}>;

export const INITIAL_STATE: CategoriesReducerState = {
  categories: [],
  isLoading: false,
  error: null,
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
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
