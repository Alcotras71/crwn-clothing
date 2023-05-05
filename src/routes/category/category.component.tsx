import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CategoriesContext } from 'context/categories.context';
import ProductCard from 'components/product-card/product-card.component';

import type { CategoriesMap, Product } from 'types/categories';

import './category.styles.scss';

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
      <h2 className="category-title">{category}</h2>
      <div className="category-container">
        {products &&
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
