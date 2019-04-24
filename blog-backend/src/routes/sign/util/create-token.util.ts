import { HttpError, HttpStatus } from '@marblejs/core';
import { generateToken } from '@marblejs/middleware-jwt';
import { reCreatePassword } from '@util';
import { User } from 'database/models';
import { of } from 'rxjs';

const SECRET_KEY = process.env.KEY_OF_FUCKING_SECRET;

export const createToken = (user: User): { token: string; userId: number } => {
  const token = generateToken({ secret: SECRET_KEY, header: { userId: user.id } });
  return { token: token(), userId: user.id };
};

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
