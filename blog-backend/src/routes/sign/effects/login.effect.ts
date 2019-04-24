import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { neverNullable } from '@util';
import { User } from 'database/models';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getRepository } from 'typeorm';
import { checkEmailAndPassword, checkLoginVaildation, createToken } from '../util';

const loginVaildater$ = requestValidator$({
  body: t.type({
    email: t.string,
    password: t.string
  })
});

export const loginEffect$: HttpEffect = req$ => {
  const userEntity = getRepository(User);

  return req$.pipe(
    use(loginVaildater$),
    mergeMap(req =>
      of(req).pipe(
        map(() => checkLoginVaildation(req.body)),
        mergeMap(() =>
          userEntity.findOne({
            where: {
              email: req.body.email
            }
          })
        ),
        mergeMap(neverNullable),
        map(user => checkEmailAndPassword({ user, body: req.body })),
        map(createToken),
        map(trans => ({
          body: {
            message: 'User register completed',
            status: HttpStatus.CREATED,
            token: trans.token
          },
          status: HttpStatus.CREATED
        })),
        catchError((err: HttpError) => throwError(err))
      )
    )
  );
};
