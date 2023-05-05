import Button from 'components/button/button.component';
import CartItem from 'components/cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from 'context/cart.context';

import './cart-dropdown.styles.scss';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
