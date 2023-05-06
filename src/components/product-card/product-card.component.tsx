import { FC, useContext } from 'react';

import Button from 'components/button/button.component';
import { CartContext } from 'context/cart.context';

import type { Product } from 'types/categories';

import {
  Name,
  ProductCardContainer,
  ProductCardFooter,
  Price,
} from 'components/product-card/product-card.styles';

type Props = {
  product: Product;
};

const ProductCard: FC<Props> = ({ product }) => {
  const { name, price, imageUrl } = product;

  const { addItemToCart } = useContext(CartContext);

  const handleAddItemToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ProductCardFooter>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </ProductCardFooter>
      <Button buttonType="inverted" onClick={handleAddItemToCart}>
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
