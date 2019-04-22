import { combineRoutes, EffectFactory, RouteEffect } from '@marblejs/core';
import { registerEffect$ } from './effects';

const register$: RouteEffect = EffectFactory.matchPath('/register')
  .matchType('POST')
  .use(registerEffect$);

export default combineRoutes('/sign', { effects: [register$] });
