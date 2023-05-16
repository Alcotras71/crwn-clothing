import { createSelector } from 'reselect';

import type { CategoriesMap, Product } from 'types/categories';
import type { RootReducerType } from "types/root-reducer-type";

const selectCategoryReducer = (state: RootReducerType) =>
  state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  categoriesSlice => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  categories =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[`${title}`.toLowerCase()] = items;
      return acc;
    }, {} as { [key: string]: Product[] }) as unknown as CategoriesMap
);
