import { HttpError, HttpStatus } from '@marblejs/core';
import { of, throwError } from 'rxjs';
import { isNullable } from './any.util';

export const neverNullable = <T>(data: T) =>
  isNullable(data)
    ? throwError(new HttpError('There is no such thing', HttpStatus.NOT_FOUND))
    : of(data as NonNullable<T>);

export const everNullable = <T>(data: T) =>
  isNullable(data)
    ? of(data as NonNullable<T>)
    : throwError(new HttpError('There is duplicate data', HttpStatus.CONFLICT));
