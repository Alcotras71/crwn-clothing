import { FC, useContext } from 'react';

import { CartContext } from 'context/cart.context';

import type { CartItemType } from 'types/cart-item';

import './checkout-item.styles.scss';

type Props = {
  cartItem: CartItemType;
};

const CheckoutItem: FC<Props> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <span className="arrow" onClick={removeItemHandler}>
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={addItemHandler}>
          &#10095;
        </span>
      </span>
      <span className="price">{`$${price}`}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;