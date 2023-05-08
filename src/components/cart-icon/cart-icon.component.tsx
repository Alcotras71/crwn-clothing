import { useContext } from 'react';

import { CartContext } from 'context/cart.context';

import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from 'components/cart-icon/cart-icon.styles';

const CartIcon = () => {
  const { setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(prevValue => !prevValue);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
