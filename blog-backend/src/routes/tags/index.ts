import { combineRoutes, EffectFactory, RouteEffect } from '@marblejs/core';
import { getTagWithPostsEffect$ } from './effects';

const getTagWithPosts$: RouteEffect = EffectFactory.matchPath('/:tagName')
  .matchType('GET')
  .use(getTagWithPostsEffect$);

export default combineRoutes('/tags', { effects: [getTagWithPosts$] });
