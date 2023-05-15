import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from 'components/product-card/product-card.component';
import { selectCategoriesMap } from 'store/categories/categories.selector';

import type { CategoriesMap, Product } from 'types/categories';

import {
  CategoryContainer,
  CategoryTitle,
} from 'routes/category/category.styles';

const Category = () => {
  const { category } = useParams();
  console.log('render/re-rendering category component');
  const categoriesMap = useSelector(selectCategoriesMap);

  const [products, setProducts] = useState<Product[]>(
    categoriesMap[category as keyof CategoriesMap]
  );

  useEffect(() => {
    console.log('effect fired calling setProducts');
    setProducts(categoriesMap[category as keyof CategoriesMap]);
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
