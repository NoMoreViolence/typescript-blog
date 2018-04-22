import modules from './modules';
import { createStore, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

/* 로그 미들웨어를 생성 할 때 설정을 커스터마이징 할 수 있습니다.
   https://github.com/evgenyrodionov/redux-logger#options
*/
const logger = createLogger();
const promiseMiddlewareV = promiseMiddleware({
  promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE']
});

export default function configureStore() {
  const store = createStore(
    modules /* preloadedState, */,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger, ReduxThunk, promiseMiddlewareV)
  );
  return store;
}
