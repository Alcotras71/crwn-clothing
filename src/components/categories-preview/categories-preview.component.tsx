import { useSelector } from 'react-redux';

import CategoryPreview from 'components/category-preview/category-preview.component';
import { selectCategoriesMap } from 'store/categories/categories.selector';

import type { CategoriesMap } from 'types/categories';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <>
      {Object.keys(categoriesMap).map(title => {
        const products = categoriesMap[title as keyof CategoriesMap];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
