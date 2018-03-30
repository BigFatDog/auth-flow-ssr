import Layout from '../components/Layout';
import PostList from '../containers/PostList';
import withProviders from '../core/withProviders';

const Posts = () => (
  <Layout>
    <article style={{ textAlign: 'center', fontSize: 16 }}>
      Pre-rendering entire html markerup. Both js and data are pre-fetched
      asynchronously with service worker. This feature uses{' '}
      <a href={'https://github.com/scaleapi/data-prefetch-link'}>
        {' '}
        fetch-with-data
      </a>{' '}
      by scale api
    </article>
    <PostList />
  </Layout>
);

export default withProviders(Posts);
