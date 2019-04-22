import { HttpEffect, HttpError, use } from '@marblejs/core';
import { requestValidator$, t } from '@marblejs/middleware-io';
import { createNewPassword, everNullable } from '@util';
import { User } from 'database/models';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getRepository } from 'typeorm';
import { checkRegisterVaildation } from '../util';

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
        map(() => checkRegisterVaildation(req.body)),
        mergeMap(() =>
          userEntity.findOne({
            where: {
              email: req.body.email
            }
          })
        ),
        mergeMap(everNullable),
        map(() => createNewPassword(req.body)),
        mergeMap(trnasPassword => {
          const user = new User();
          user.email = req.body.email;
          user.password = trnasPassword.password;
          user.salt = trnasPassword.saltKey;
          user.name = req.body.name;
          return userEntity.save(user);
        }),
        mergeMap(user =>
          of({
            body: {
              message: 'User register completed',
              status: 200,
              userId: user.id
            }
          })
        ),
        catchError((err: HttpError) => throwError(err))
      )
    )
  );
};
