import { HttpEffect, HttpError, HttpStatus } from '@marblejs/core';
import { User } from 'database/models';
import { getUserByUserId } from 'database/queries';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getRepository } from 'typeorm';
import { exportObjectKeys } from 'utils/filter.util';

export const profileEffect$: HttpEffect = req$ => {
  const userEntity = getRepository(User);

  return req$.pipe(
    mergeMap(req =>
      of(req).pipe(
        mergeMap(() => getUserByUserId({ entity: userEntity, userId: req.user.userId })),
        map((user: User) => exportObjectKeys(user, 'password', 'salt', 'posts')),
        mergeMap(trans => {
          return of({
            body: {
              message: 'Get user info success',
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
