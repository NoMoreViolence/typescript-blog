import { Middleware, Dispatch, Action, AnyAction } from 'redux';

export type ThunkAction<R, S, A extends Action = AnyAction, E = {}> = {
  (dispatch: Dispatch<A, S>, getState: () => S, extraArgument: E): R;
};

declare module 'redux' {
  export interface Dispatch<A extends Action = AnyAction, S = {}> {
    <R, E>(thunk: ThunkAction<R, S, A, E>): R;
  }
}

declare const thunk: Middleware & {
  withExtraArgument(extraArgument: any): Middleware;
};

export default thunk;
