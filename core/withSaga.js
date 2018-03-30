import withRedux from 'next-redux-wrapper';
import React, { Component } from 'react';
import { END } from 'redux-saga';

import initRedux from './initRedux';

function withReduxSaga(BaseComponent) {
  class WrappedComponent extends Component {
    static async getInitialProps(ctx) {
      const { isServer, store } = ctx;

      let props;
      if (BaseComponent.getInitialProps) {
        props = await BaseComponent.getInitialProps(ctx);
      }

      if (isServer) {
        store.dispatch(END);
        await store.runSaga.done;
      }

      return props;
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  return WrappedComponent;
}

export default function withSaga(BaseComponent) {
  return withRedux(initRedux)(withReduxSaga(BaseComponent));
}
