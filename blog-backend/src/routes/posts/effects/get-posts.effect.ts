import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { exportObjectKeys, optional } from '@utils';
import { Post } from 'database/models';
import { getPosts } from 'database/queries';
import { of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { getRepository } from 'typeorm';

const getPostsVaildator$ = requestValidator$({
  query: t.type({
    offset: optional(t.string),
    tag: optional(t.string)
  })
});

export const getPostsEffect$: HttpEffect = req$ => {
  const postEntity = getRepository(Post);

  return req$.pipe(
    use(getPostsVaildator$),
    mergeMap(req =>
      of(req).pipe(
        // mergeMap(() =>)
        mergeMap(() =>
          getPosts(
            {
              entity: postEntity,
              // select: { tags: req.query.tag }
              select: exportObjectKeys(req.query, 'offset', 'tag')
            },
            {
              order: { updatedAt: 'DESC' },
              select: ['id', 'title', 'description', 'createdAt', 'updatedAt'],
              skip: Number.isInteger(Number(req.query.offset)) ? Number(req.query.offset) : 0,
              take: 20
            }
          )
        ),
        mergeMap(trans => {
          return of({
            body: {
              message: 'Get posts info success',
              posts: trans,
              status: HttpStatus.OK
            },
            status: HttpStatus.OK
          });
        }),
        catchError((err: HttpError) => throwError(err))
      )
    )
  );
};
