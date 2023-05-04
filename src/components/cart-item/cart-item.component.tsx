import { FC } from 'react';

import type { CartItemType } from 'types/cart-item';

import './cart-item.styles.scss';

type Props = {
  cartItem: CartItemType;
};

const CartItem: FC<Props> = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
