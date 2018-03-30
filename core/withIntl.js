import React, { PureComponent } from 'react';
import { translationMessages } from '../locales';
import LanguageProvider from '../components/LanguageProvider';

export default Page =>
  class PageWithIntl extends PureComponent {
    static async getInitialProps(context) {
      let props;
      if (typeof Page.getInitialProps === 'function') {
        props = await Page.getInitialProps(context);
      }

      return { ...props };
    }

    render() {
      return (
        <LanguageProvider messages={translationMessages}>
          <Page {...this.props} />
        </LanguageProvider>
      );
    }
  };
