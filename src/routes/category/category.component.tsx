import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CategoriesContext } from 'context/categories.context';
import ProductCard from 'components/product-card/product-card.component';

import type { CategoriesMap, Product } from 'types/categories';

import {
  CategoryContainer,
  CategoryTitle,
} from 'routes/category/category.styles';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState<Product[]>(
    (categoriesMap as CategoriesMap)[category as keyof CategoriesMap]
  );

  useEffect(() => {
    setProducts(
      (categoriesMap as CategoriesMap)[category as keyof CategoriesMap]
    );
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
