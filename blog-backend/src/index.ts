import * as dotenv from 'dotenv';
dotenv.config();
import { createServer } from '@marblejs/core';
import httpListener from 'routes';
import './database';

export const server = createServer({
  hostname: 'localhost',
  httpListener,
  port: 3001
});
server.run();
