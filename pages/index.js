import React, { Component } from 'react';
import withProviders from '../core/withProviders';
import Layout from '../components/Layout';
import RequireAuth from '../core/auth/AuthComp';

class Home extends Component {
  render() {
    return (
      <Layout>
        <article>
          <h1>The Idea Behind This Example</h1>
        </article>

        <ul>
          <li>/post: SSR enabled, fetch data from graphql</li>
          <li>/postnossr: The entire module runs on browser only</li>
          <li>
            /prefetch: Prefetch js asynchronously with service worker during
            home page is loading. Only js gets involved, not data
          </li>
          <li>
            /data-prefetch: Pre-rendering entire html markup. Both js and data
            are pre-fetched asynchronously with service worker
          </li>
        </ul>
      </Layout>
    );
  }
}

const Comp = RequireAuth(Home);

export default withProviders(() => <Comp />);
