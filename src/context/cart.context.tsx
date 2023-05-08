import { createContext, FC, PropsWithChildren, useReducer } from 'react';

import { createAction } from 'utils/reducer/reducer.utils';

import type { CartItemType } from 'types/cart-item';
import type { Product } from 'types/categories';
import type { Action } from 'types/action';
import type { ValueOf } from 'types/valueof';

type CartContextType = {
  isCartOpen: boolean;
  setIsCartOpen: (bool: boolean) => void;
  cartItems: CartItemType[];
  addItemToCart: (product: Product) => void;
  removeItemFromCart: (cartItem: CartItemType) => void;
  clearItemFromCart: (cartItem: CartItemType) => void;
  cartCount: number;
  cartTotal: number;
};

type CartReducerState = {
  isCartOpen: boolean;
  cartItems: CartItemType[];
  cartCount: number;
  cartTotal: number;
};

const addCartItem = (
  cartItems: CartItemType[],
  productToAdd: Product
): CartItemType[] => {
  const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItemType[],
  cartItemToRemove: CartItemType
) => {
  const existingCartItem = cartItems.find(
    item => item.id === cartItemToRemove.id
  );

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: CartItemType[],
  cartItemToClear: CartItemType
) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE: CartReducerState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (
  state: CartReducerState,
  action: Action<
    ValueOf<typeof CART_ACTION_TYPES>,
    Partial<CartReducerState> | boolean
  >
) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...(payload as Partial<CartReducerState>),
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload as boolean,
      };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ cartItems, cartTotal, cartCount, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems: CartItemType[]) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (product: Product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItem: CartItemType) => {
    const newCartItems = removeCartItem(cartItems, cartItem);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItem: CartItemType) => {
    const newCartItems = clearCartItem(cartItems, cartItem);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool: boolean) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
