import { FC } from 'react';

import Button from 'components/button/button.component';

import type { Product } from 'types/product';

import './product-card.styles.scss';

type Props = {
  product: Omit<Product, 'id'>;
};

const ProductCard: FC<Props> = ({ product }) => {
  const { name, price, imageUrl } = product;

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted">Add to card</Button>
    </div>
  );
};

export default ProductCard;
