import Layout from '../components/Layout';
import PostList from '../containers/PostList';
import withProviders from '../core/withProviders';

const Posts = () => (
  <Layout>
    <article style={{ textAlign: 'center', fontSize: 16 }}>
      SSR enabled. fetch data from graphql
    </article>

    <PostList />
  </Layout>
);

export default withProviders(Posts);
