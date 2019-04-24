import { email as emailRegex, password as passwordRegex } from '@lib/regex';
import { HttpError, HttpStatus } from '@marblejs/core';
import * as crypto from 'crypto';
import * as randomstring from 'randomstring';

export const checkEmail = (email: string): void => {
  if (!emailRegex.test(email)) {
    throw new HttpError('E-mail format error.', HttpStatus.CONFLICT);
  }
};

export const checkPassword = (password: string, rPassword: string): void => {
  if (password !== rPassword) {
    throw new HttpError('Password verification and password do not match.', HttpStatus.CONFLICT);
  }

  if (!passwordRegex.test(password)) {
    throw new HttpError('Password format error.', HttpStatus.CONFLICT);
  }
};

export const hashPassword = (password: string, salt: string): string =>
  crypto.pbkdf2Sync(password, salt, 100234, 64, 'sha512').toString('base64');

export const createNewPassword = ({
  password,
  rPassword
}: {
  password: string;
  rPassword: string;
}): { password: string; saltKey: string } => {
  checkPassword(password, rPassword);

  const saltNumber = randomstring.generate({ length: 10, charset: 'numeric' });
  return { password: hashPassword(password, saltNumber), saltKey: saltNumber };
};
