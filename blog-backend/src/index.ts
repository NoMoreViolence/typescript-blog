import * as dotenv from 'dotenv';
dotenv.config();
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as createError from 'http-errors';
import * as methodOverride from 'method-override';
import * as morgan from 'morgan';
import * as path from 'path';

import './database';

const app: express.Application = express();
const httpServer = new http.Server(app);

process.env.NODE_ENV === 'production' ? console.log('hello production') : app.use(morgan('dev'));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(helmet({ noCache: false }));
app.use(express.static(path.join(__dirname, ''))); // Static Folder confing

// app.use('/api', Router);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(createError(404));
});
app.use((err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ success: false, message: 'Error !' });
});

const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
  console.log(`✓ Server is running at http://localhost:${port}`);
});
