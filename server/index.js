import express from 'express';

import next from 'next';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import IntlPolyfill from 'intl';

import login from './api/auth/login';
import register from './api/auth/register';
import logout from './api/auth/logout';
import verifyToken from './api/auth/verify';

import tokenMiddleware from './middlewares/token-middleware';
import { graphqlMiddleware, graphiqlMiddleware } from './middlewares/graphql';
import addGraphQLSubscriptions from './middlewares/graphql-subscriptions';

import routes from '../routes'; // eslint-disable-line global-require
import startMongo from './database/mongo';

import logger from './logger';
import argv from './argv';
import setting from '../setting.json';

const port = parseInt(process.env.PORT, 10) || setting.port;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handler = routes.getRequestHandler(app);

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

app
  .prepare()
  .then(() => {
    const server = express();

    // node api
    server.enable('trust proxy');
    server.use(cors({ credentials: true }));
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(cookieParser());

    server.post('/login', login(setting.SECRET));
    server.post('/verifyToken', verifyToken(setting.SECRET));
    server.post('/signup', register(setting.SECRET));
    server.post('/logout', logout);

    // middlewares
    server.use(
      '/graphql',
      tokenMiddleware(setting.SECRET),
      graphqlMiddleware()
    );
    server.get('/graphiql', graphiqlMiddleware());
    addGraphQLSubscriptions(server);

    server.get('*', (req, res) => handler(req, res));

    const ngrok =
      (dev && process.env.ENABLE_TUNNEL) || argv.tunnel
        ? require('ngrok')
        : false; // eslint-disable-line global-require

    // get the intended host and port number, use localhost and port 3000 if not provided
    const customHost = argv.host || process.env.HOST;
    const host = customHost || null; // Let http.Server use its default IPv6/4 host
    const prettyHost = customHost || 'localhost';

    // Start your app.
    server.listen(port, host, err => {
      // eslint-disable-line consistent-return
      if (err) {
        return logger.error(err.message);
      }

      // Connect to ngrok in dev mode
      if (ngrok) {
        ngrok.connect(port, (innerErr, url) => {
          // eslint-disable-line consistent-return
          if (innerErr) {
            return logger.error(innerErr);
          }

          logger.appStarted(port, prettyHost, url);
        });
      } else {
        logger.appStarted(port, prettyHost);
      }
    });
  })
  .then(() => {
    startMongo();
  });

function unless(paths, middleware) {
  return (req, res, next) => {
    let directAccess = false;
    paths.forEach(path => {
      if (path === req.path || req.path.includes(path)) {
        directAccess = true;
        return;
      }
    });

    if (directAccess) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
}
