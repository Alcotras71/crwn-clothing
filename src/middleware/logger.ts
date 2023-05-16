import type { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';

export const loggerMiddleware: Middleware =
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
