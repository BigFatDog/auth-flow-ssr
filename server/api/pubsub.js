import { wrapPubSub } from 'apollo-logger';
import { PubSub } from 'graphql-subscriptions';

const pubsub =
  process.env.NODE_ENV === 'production'
    ? wrapPubSub(new PubSub(), { logger: console.log })
    : new PubSub();

export default pubsub;
