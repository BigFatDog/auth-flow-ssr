import React from 'react';
import withProviders from '../core/withProviders';
import EmptyLayout from '../components/Layout/EmptyLayout';
import SignUp from '../containers/Auth/SignUp';

class MyPage extends React.Component {
  render() {
    return (
      <EmptyLayout>
        <SignUp />
      </EmptyLayout>
    );
  }
}

export default withProviders(MyPage);
