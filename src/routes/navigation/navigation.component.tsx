import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { CartContext } from 'context/cart.context';
import { signOutUser } from 'utils/firebase/firebase.utils';
import { selectCurrentUser } from 'store/user/user.selector';

import { ReactComponent as CrwnLogo } from 'assets/crown.svg';
import CartIcon from 'components/cart-icon/cart-icon.component';
import CartDropdown from 'components/cart-dropdown/cart-dropdown.component';

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from 'routes/navigation/navigation.styles';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer className="navigation">
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
