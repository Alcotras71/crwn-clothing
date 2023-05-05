import { useContext } from 'react';

import CheckoutItem from 'components/checkout-item/checkout-item.component';

import { CartContext } from 'context/cart.context';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        {['Product', 'Description', 'Quantity', 'Price', 'Remove'].map(el => (
          <div key={el} className="header-block">
            <span>{el}</span>
          </div>
        ))}
      </div>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className="total">Total: ${cartTotal}</span>
    </div>
  );
};

export default Checkout;
