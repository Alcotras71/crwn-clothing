import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from 'store/cart/cart.selector';

import CheckoutItem from 'components/checkout-item/checkout-item.component';

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from 'routes/checkout/checkout.styles';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

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
