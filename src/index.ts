import type {Request} from 'express';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import {format} from 'date-fns';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {isEmpty} from 'lodash';
import routes from './routes';
import init from './scripts';

require('dotenv').config();

process.env.TZ = 'GMT-3';

const {
  API_PORT,
  SECRET_TOKEN_KEY,
  API_ROOT
} = process.env;
const PORT = API_PORT || 3000;

const app: express.Application = express();

app.use((_req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  next();
});

morgan.token('localdate', () => format(new Date(new Date().toUTCString()), 'HH:mm:ss'));
morgan.token('params', (request: Request) => {
  const {body} = request;

  if (isEmpty(body)) {
    return '';
  }

  if (body.password) {
    body.password = '*****';
  }

  if (body.newPassword) {
    body.newPassword = '*****';
  }

  if (body.currentPassword) {
    body.currentPassword = '*****';
  }

  return `${JSON.stringify(body)}`;
});

app.use(morgan('[:status - :localdate] :method :url :params - :response-time ms'));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: [
    `http://localhost:${PORT}`,
    'http://localhost:8000'
  ],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Methods',
    'Access-Control-Request-Headers'
  ],
  credentials: true
}));
app.use(cookieParser(SECRET_TOKEN_KEY));
app.use(API_ROOT!, routes);

app.listen(PORT, () => {
  init();

  console.log(`App is listening on port ${PORT}`);
});
