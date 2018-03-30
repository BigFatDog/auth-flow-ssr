import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import { ApolloLink } from 'apollo-link';
import { LoggingLink } from 'apollo-logger';
import { createApolloFetch } from 'apollo-fetch';
import { setContext } from 'apollo-link-context';
import { BatchHttpLink } from 'apollo-link-batch-http';
import Router from 'next/router';

import {
  errorLink,
  queryOrMutationLink,
  requestLink,
  subscriptionLink,
} from './links';

import settings from '../../setting.json';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  let link = null;

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');

    if (token === null && process.browser) {
      Router.push('/login');
      return null;
    }
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  });

  if (process.browser) {
    link = ApolloLink.from([
      errorLink,
      authLink,
      // LoggingLink,
      requestLink({
        queryOrMutationLink: queryOrMutationLink(),
        subscriptionLink: subscriptionLink(),
      }),
    ]);
  } else {
    const fetch = createApolloFetch({ uri: settings.graphqlUrl });
    fetch.batchUse(({ options }, next) => {
      options.credentials = 'include';
      options.headers = req.headers;

      next();
    });

    const links = new BatchHttpLink({ fetch });
    link = ApolloLink.from(
      (process.env.NODE_ENV === 'production' ? [new LoggingLink()] : []).concat(
        [links]
      )
    );
  }

  return new ApolloClient({
    connectToDevTools: process.browser,
    queryDeduplication: true,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    ssrForceFetchDelay: 100,
    link,
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
