import React from 'react';
import withProviders from '../core/withProviders';
import EmptyLayout from '../components/Layout/EmptyLayout';

class MyPage extends React.Component {
  render() {
    return (
      <EmptyLayout>
        <ResetPass />
      </EmptyLayout>
    );
  }
}

export default withProviders(MyPage);
