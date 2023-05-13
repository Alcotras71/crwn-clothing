import { USER_ACTION_TYPES } from 'store/user/user.types';
import { CATEGORIES_ACTION_TYPES } from "store/categories/categories.types";

import type { CategoriesMap } from 'types/categories';
import type { Action } from 'types/action';
import type { ValueOf } from 'types/valueof';

type CategoriesReducerState = {
  categoriesMap: CategoriesMap | object;
};

export const INITIAL_STATE: CategoriesReducerState = {
  categoriesMap: {},
};

export const categoriesReducer = (
  state = INITIAL_STATE,
  action: Action<
    ValueOf<typeof USER_ACTION_TYPES>,
    CategoriesReducerState['categoriesMap']
  >
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return { ...state, categoriesMap: payload };
    default:
      return state;
  }
};
