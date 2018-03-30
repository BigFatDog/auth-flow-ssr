import withApollo from './withApollo';
import withSaga from './withSaga';
import withIntl from './withIntl';

const withProviders = Comp => withSaga(withApollo(withIntl(Comp)));

export default withProviders;
