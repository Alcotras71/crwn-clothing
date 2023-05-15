import { store } from 'store/store';

import type { CategoriesMap, Product } from 'types/categories';

export const selectCategoriesMap = (
  state: ReturnType<typeof store.getState>
) => {
  console.log('select Categories fired');
  return state.categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[`${title}`.toLowerCase()] = items;
    return acc;
  }, {} as { [key: string]: Product[] }) as unknown as CategoriesMap;
};
