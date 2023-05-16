import { createSelector } from 'reselect';

import type { CategoriesMap, Product } from 'types/categories';
import type { RootState } from 'types/store-types';

const selectCategoryReducer = (state: RootState) => state.categories;

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

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  categoriesSlice => categoriesSlice.isLoading
);
