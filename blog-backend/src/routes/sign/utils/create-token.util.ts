import { HttpError, HttpStatus } from '@marblejs/core';
import { generateExpirationInHours, generateToken } from '@marblejs/middleware-jwt';
import { reCreatePassword } from '@utils';
import { User } from 'database/models';

export const createToken = (user: User): { token: string; expiresIn: number } => ({
  expiresIn: generateExpirationInHours(168),
  token: generateToken({
    algorithm: 'HS512',
    expiresIn: '7d',
    secret: process.env.KEY_OF_FUCKING_SECRET
  })({ userId: user.id })
});

export const checkEmailAndPassword = (trans: {
  user: User;
  body: {
    email: string;
    password: string;
  };
}) => {
  const userInputPassword = reCreatePassword({ password: trans.body.password, hashKey: trans.user.salt });

  if (trans.user.password !== userInputPassword.password) {
    throw new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  return trans.user;
};
