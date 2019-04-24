import { combineRoutes, EffectFactory, RouteEffect } from '@marblejs/core';
import { loginEffect$, registerEffect$ } from './effects';

const register$: RouteEffect = EffectFactory.matchPath('/register')
  .matchType('POST')
  .use(registerEffect$);

const login$: RouteEffect = EffectFactory.matchPath('/login')
  .matchType('POST')
  .use(loginEffect$);

export default combineRoutes('/sign', { effects: [register$, login$] });
