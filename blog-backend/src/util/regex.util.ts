import { email as emailRegex, password as passwordRegex } from '@lib/regex';
import { HttpError, HttpStatus } from '@marblejs/core';
import * as crypto from 'crypto';
import * as randomstring from 'randomstring';

export const checkEmail = (email: string): void => {
  if (!emailRegex.test(email)) {
    throw new HttpError('E-mail format error.', HttpStatus.CONFLICT);
  }
};

export const checkPassword = (password: string): void => {
  if (!passwordRegex.test(password)) {
    throw new HttpError('Password format error.', HttpStatus.CONFLICT);
  }
};

export const checkSameValue = (valueOne: string | number, valueTwo: string | number): void => {
  if (valueOne !== valueTwo) {
    throw new HttpError('Password verification and password do not match.', HttpStatus.CONFLICT);
  }
};

export const hashPassword = (password: string, salt: string): string =>
  crypto.pbkdf2Sync(password, salt, 100234, 64, 'sha512').toString('base64');

export const createNewPassword = ({ password }: { password: string }): { password: string; saltKey: string } => {
  const saltNumber = randomstring.generate({ length: 10, charset: 'numeric' });
  return { password: hashPassword(password, saltNumber), saltKey: saltNumber };
};

export const reCreatePassword = ({ password, hashKey }: { password: string; hashKey: string }) => ({
  password: hashPassword(password, hashKey),
  saltKey: hashKey
});
