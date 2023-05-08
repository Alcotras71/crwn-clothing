import { useContext } from 'react';

import CheckoutItem from 'components/checkout-item/checkout-item.component';

import { CartContext } from 'context/cart.context';

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from 'routes/checkout/checkout.styles';

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        {['Product', 'Description', 'Quantity', 'Price', 'Remove'].map(el => (
          <HeaderBlock key={el}>
            <span>{el}</span>
          </HeaderBlock>
        ))}
      </CheckoutHeader>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
