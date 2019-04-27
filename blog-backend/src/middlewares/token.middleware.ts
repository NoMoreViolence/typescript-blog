import { authorize$ as jwt$, VerifyOptions } from '@marblejs/middleware-jwt';

const jwtConfig: VerifyOptions = { secret: process.env.KEY_OF_FUCKING_SECRET };

// export const authorize$ = jwt$(jwtConfig);
