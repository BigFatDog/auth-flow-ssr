import dynamic from 'next/dynamic';

import Layout from '../components/Layout';
import withProviders from '../core/withProviders';

const DynamicComponentWithNoSSR = dynamic(import('../containers/PostList'), {
  ssr: false,
});

export default withProviders(() => (
  <Layout>
    <article style={{ textAlign: 'center', fontSize: 16 }}>
      The entire module runs on browser only, without SSR
    </article>
    <DynamicComponentWithNoSSR />
  </Layout>
));
