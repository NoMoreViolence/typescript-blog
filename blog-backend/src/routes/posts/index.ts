import { combineRoutes, EffectFactory, RouteEffect } from '@marblejs/core';
import { getPostEffect$, getPostsEffect$ } from './effects';

const getPosts$: RouteEffect = EffectFactory.matchPath('/')
  .matchType('GET')
  .use(getPostsEffect$);

const getPost$: RouteEffect = EffectFactory.matchPath('/:postName')
  .matchType('GET')
  .use(getPostEffect$);

export default combineRoutes('/posts', { effects: [getPosts$, getPost$] });
