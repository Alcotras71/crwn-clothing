import { useContext } from 'react';

import { CategoriesContext } from 'context/categories.context';
import CategoryPreview from 'components/category-preview/category-preview.component';

import type { CategoriesMap } from 'types/categories';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <>
      {Object.keys(categoriesMap).map(title => {
        const products = (categoriesMap as CategoriesMap)[
          title as keyof CategoriesMap
        ];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
