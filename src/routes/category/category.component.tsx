import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from 'components/product-card/product-card.component';
import Spinner from 'components/spinner/spinner.component';

import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from 'store/categories/categories.selector';

import type { CategoriesMap, Product } from 'types/categories';

import {
  CategoryContainer,
  CategoryTitle,
} from 'routes/category/category.styles';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState<Product[]>(
    categoriesMap[category as keyof CategoriesMap]
  );

  useEffect(() => {
    setProducts(categoriesMap[category as keyof CategoriesMap]);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle>{category}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </>
  );
};

export default Category;
