import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from 'store/cart/cart.action';

import Button from 'components/button/button.component';

import type { Product } from 'types/categories';

import {
  Name,
  ProductCardContainer,
  ProductCardFooter,
  Price,
} from 'components/product-card/product-card.styles';
import { selectCartItems } from 'store/cart/cart.selector';

type Props = {
  product: Product;
};

const ProductCard: FC<Props> = ({ product }) => {
  const { name, price, imageUrl } = product;

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const handleAddItemToCart = () => dispatch(addItemToCart(cartItems, product));

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
