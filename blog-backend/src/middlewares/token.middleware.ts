import { authorize$ as jwt$, VerifyOptions } from '@marblejs/middleware-jwt';
import { of } from 'rxjs';

const jwtConfig: VerifyOptions = { algorithms: ['HS512'], secret: process.env.KEY_OF_FUCKING_SECRET };

export const authorize$ = jwt$(jwtConfig, payload => of(payload));
