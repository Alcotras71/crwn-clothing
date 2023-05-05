import { FC, useContext } from 'react';

import Button from 'components/button/button.component';
import { CartContext } from 'context/cart.context';

import type { Product } from 'types/categories';

import './product-card.styles.scss';

type Props = {
  product: Product;
};

const ProductCard: FC<Props> = ({ product }) => {
  const { name, price, imageUrl } = product;

  const { addItemToCart } = useContext(CartContext);

  const handleAddItemToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={handleAddItemToCart}>
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
