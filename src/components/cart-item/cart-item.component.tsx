import { FC } from 'react';

import type { CartItemType } from 'types/cart-item';

import {
  CartItemContainer,
  ItemDetails,
  Name,
} from 'components/cart-item/cart-item.styles';

type Props = {
  cartItem: CartItemType;
};

const CartItem: FC<Props> = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
