import { withFilter } from 'graphql-subscriptions';
import { find, filter } from 'lodash';

import { posts, authors } from './PostModel';

const POST_SUBSCRIPTION = 'post_subscription';

const createResolvers = pubsub => ({
  Query: {
    posts: (root, args, context) => {
      console.log(context);
      return posts;
    },
    author: (_, { id }) => find(authors, { id }),
  },
  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      pubsub.publish(POST_SUBSCRIPTION, {
        id: postId,
        postUpdated: post,
      });
      return post;
    },
  },
  Author: {
    posts: author => filter(posts, { authorId: author.id }),
  },
  Post: {
    author: post => find(authors, { id: post.authorId }),
  },
  Subscription: {
    postUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(POST_SUBSCRIPTION),
        (payload, variables) => true
        // return payload.id === variables.postId;
      ),
    },
  },
});

export default createResolvers;
