import { FC } from 'react';
import { Link } from 'react-router-dom';

import ProductCard from 'components/product-card/product-card.component';

import type { Product } from 'types/categories';

import './category-preview.styles.scss';

type Props = {
  title: string;
  products: Product[];
};

const CategoryPreview: FC<Props> = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
