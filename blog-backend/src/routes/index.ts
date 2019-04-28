import { combineRoutes, HttpError, httpListener, HttpStatus, r } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { cors$ } from '@marblejs/middleware-cors';
import { logger$ } from '@marblejs/middleware-logger';
import { throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import posts$ from './posts';
import sign$ from './sign';

const api$ = combineRoutes('/api', [sign$, posts$]);
const notFound$ = r.pipe(
  r.matchPath('*'),
  r.matchType('*'),
  r.useEffect(req$ => req$.pipe(mergeMap(() => throwError(new HttpError('Route not found', HttpStatus.NOT_FOUND)))))
);

const effects = [api$, notFound$];
const middlewares = [
  bodyParser$(),
  logger$(),
  cors$({
    allowHeaders: '*',
    maxAge: 3600,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 204,
    origin: '*'
  })
];

export default httpListener({ effects, middlewares });
