import { Action } from 'types/action';
import { ValueOf } from 'types/valueof';
import { CART_ACTION_TYPES } from 'store/cart/cart.types';
import { CartItemType } from 'types/cart-item';

type CartReducerState = {
  isCartOpen: boolean;
  cartItems: CartItemType[];
};

const INITIAL_STATE: CartReducerState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: Action<
    ValueOf<typeof CART_ACTION_TYPES>,
    Partial<CartReducerState> | boolean
  >
): CartReducerState => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload as CartItemType[],
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload as boolean,
      };
    default:
      return state;
  }
};
