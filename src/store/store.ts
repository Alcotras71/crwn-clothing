import {
  compose,
  createStore,
  applyMiddleware,
  AnyAction,
  MiddlewareAPI,
  Dispatch,
} from 'redux';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
import * as Redux from 'redux';

const loggerMiddleware: Redux.Middleware =
  (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
    if (!action.type) {
      return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
  };

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
