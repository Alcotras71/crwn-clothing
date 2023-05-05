import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/button/button.component';
import CartItem from 'components/cart-item/cart-item.component';
import { CartContext } from 'context/cart.context';

import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from 'components/cart-dropdown/cart-dropdown.styles';

const CartDropdown = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
