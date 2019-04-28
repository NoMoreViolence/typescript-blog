import { HttpEffect, HttpError, HttpStatus, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { createNewPassword, everNullable } from '@utils';
import { User } from 'database/models';
import { createUser, getUserByEmail } from 'database/queries';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { getRepository } from 'typeorm';
import { checkRegisterVaildation, createToken } from '../utils';

const registerVaildater$ = requestValidator$({
  body: t.type({
    email: t.string,
    name: t.string,
    password: t.string,
    rPassword: t.string
  })
});

export const registerEffect$: HttpEffect = req$ => {
  const userEntity = getRepository(User);

  return req$.pipe(
    use(registerVaildater$),
    mergeMap(req =>
      of(req).pipe(
        // tap(() => {
        //   throw new HttpError('Disabled', HttpStatus.GONE);
        // }),
        map(() => checkRegisterVaildation(req.body)),
        mergeMap(() => getUserByEmail({ entity: userEntity, email: req.body.email })),
        mergeMap(everNullable),
        map(() => createNewPassword(req.body)),
        mergeMap(trnasPassword => createUser({ entity: userEntity, ...req.body, ...trnasPassword })),
        map(createToken),
        map(trans => ({
          body: {
            expiresIn: trans.expiresIn,
            message: 'User register completed',
            token: trans.token
          },
          status: HttpStatus.CREATED
        })),
        catchError((err: HttpError) => throwError(err))
      )
    )
  );
};
