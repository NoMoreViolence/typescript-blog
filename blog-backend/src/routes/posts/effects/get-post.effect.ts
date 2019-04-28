import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { neverNullable } from '@utils';
import { Post } from 'database/models';
import { getPostByPostTitle } from 'database/queries';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getRepository } from 'typeorm';
import { exportObjectKeys } from 'utils/filter.util';

const getPostValidator$ = requestValidator$({
  params: t.type({
    postName: t.string
  })
});

export const getPostEffect$: HttpEffect = req$ => {
  const postEntity = getRepository(Post);

  return req$.pipe(
    use(getPostValidator$),
    mergeMap(req =>
      of(req).pipe(
        mergeMap(() =>
          getPostByPostTitle({
            entity: postEntity,
            postTitle: req.params.postName
          })
        ),
        mergeMap(neverNullable),
        map((post: Post) => exportObjectKeys(post, 'isPublished', 'user')),
        mergeMap(trans => {
          return of({
            body: {
              message: 'Get post info success',
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
