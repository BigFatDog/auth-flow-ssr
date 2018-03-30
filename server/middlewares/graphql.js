import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import 'isomorphic-fetch';
import settings from '../../setting.json';
import logger from '../logger';
import schema from '../api';

const graphqlMiddleware = () =>
  graphqlExpress(req => ({
    schema,
    debug: true,
    context: {
      user: {
        _id: req.user._id,
        username: req.user.username,
      },
    },
    formatError: error => {
      logger.error('GraphQL execution error:', error);
      return error;
    },
    tracing: true,
    cacheControl: true,
  }));

const graphiqlMiddleware = () =>
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: settings.wsURI,
  });

export { graphqlMiddleware, graphiqlMiddleware };
