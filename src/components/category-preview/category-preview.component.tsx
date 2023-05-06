import { FC } from 'react';

import ProductCard from 'components/product-card/product-card.component';

import type { Product } from 'types/categories';

import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from 'components/category-preview/category-preview.styles';

type Props = {
  title: string;
  products: Product[];
};

const CategoryPreview: FC<Props> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
