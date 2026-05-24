import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';

export const buildStore = (reducers, history, middlewares = []) =>
  createStore(
    reducers(history),
    {},
    composeWithDevTools(
      applyMiddleware(
        thunk,
        createLogger({ collapsed: true, trace: true }),
        routerMiddleware(history),
        ...middlewares
      )
    )
  );
