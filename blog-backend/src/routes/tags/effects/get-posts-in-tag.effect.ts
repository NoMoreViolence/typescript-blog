import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { neverNullable } from '@utils';
import { Post, Tag } from 'database/models';
import { getPostByPostTitle, getTagWithPosts } from 'database/queries';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getRepository } from 'typeorm';
import { exportObjectKeys } from 'utils/filter.util';

const getTagWithPostsValidator$ = requestValidator$({
  params: t.type({
    tagName: t.string
  })
});

export const getTagWithPostsEffect$: HttpEffect = req$ => {
  const tagEntity = getRepository(Tag);

  return req$.pipe(
    use(getTagWithPostsValidator$),
    mergeMap(req =>
      of(req).pipe(
        mergeMap(() => {
          console.log(req.params);

          return getTagWithPosts({
            entity: tagEntity,
            select: { name: req.params.tagName }
          });
        }),
        mergeMap(neverNullable),
        // map((post: Post) => exportObjectKeys(post, 'isPublished', 'user')),
        mergeMap(trans => {
          return of({
            body: {
              message: 'Get tag with posts success',
              status: HttpStatus.OK,
              user: trans
            },
            status: HttpStatus.OK
          });
        }),
        catchError((err: HttpError) => throwError(err))
      )
    )
  );
};
