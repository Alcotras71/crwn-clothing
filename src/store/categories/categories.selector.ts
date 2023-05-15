import { createSelector } from 'reselect';

import { rootReducer } from 'store/root-reducer';

import type { CategoriesMap, Product } from 'types/categories';

const selectCategoryReducer = (state: ReturnType<typeof rootReducer>) =>
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
