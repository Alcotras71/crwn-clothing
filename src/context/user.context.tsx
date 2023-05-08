import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useReducer,
} from 'react';

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  UserInfo,
} from 'utils/firebase/firebase.utils';
import { createAction } from 'utils/reducer/reducer.utils';

import type { Action } from 'types/action';
import type { ValueOf } from 'types/valueof';

type UserContextType = {
  currentUser: UserInfo | null;
  setCurrentUser: (user: UserInfo | null) => void;
};

type UserReducerState = {
  currentUser: UserInfo | null;
};

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE: UserReducerState = {
  currentUser: null,
};

const userReducer = (
  state: UserReducerState,
  action: Action<
    ValueOf<typeof USER_ACTION_TYPES>,
    UserReducerState['currentUser']
  >
) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user: UserInfo | null) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
