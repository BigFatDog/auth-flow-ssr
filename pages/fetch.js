import Layout from '../components/Layout';
import PostList from '../containers/PostList';
import withProviders from '../core/withProviders';

const Posts = () => (
  <Layout>
    <article style={{ textAlign: 'center', fontSize: 16 }}>
      Prefetch js asynchronously with service worker during home page is
      loading. Only js gets involved, not data
    </article>
    <PostList />
  </Layout>
);

export default withProviders(Posts);
