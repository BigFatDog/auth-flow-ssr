import React from 'react';
import withProviders from '../core/withProviders';
import EmptyLayout from '../components/Layout/EmptyLayout';
import Login from '../containers/Auth/Login';

class MyPage extends React.Component {
  render() {
    return (
      <EmptyLayout>
        <Login />
      </EmptyLayout>
    );
  }
}

export default withProviders(MyPage);
