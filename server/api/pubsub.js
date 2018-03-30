import { addApolloLogging } from 'apollo-logger';
import { PubSub } from 'graphql-subscriptions';

const pubsub =
  process.env.NODE_ENV === 'production'
    ? addApolloLogging(new PubSub())
    : new PubSub();

export default pubsub;
