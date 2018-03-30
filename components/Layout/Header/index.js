import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import messages from './messages';
import LocaleToggle from '../LocaleToggle';
import { logout } from '../../../core/auth/actions';
import { NavBar, NavHeader, NavLink } from './Styles';

import saga from './saga';
import injectSaga from '../../../core/runtime/injectSaga';

class Header extends Component {
  static propTypes = {
    onLogout: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.logout = e => this._logout(e);
  }

  _logout() {
    const { onLogout } = this.props;
    onLogout();
  }

  render() {
    return (
      <NavBar>
        <NavHeader>
          <Link href="/">
            <a className="nav-link">Home</a>
          </Link>

          <Link href="/post">
            <a className="nav-link">Post</a>
          </Link>
          <Link href="/nossr">
            <a className="nav-link">No SSR</a>
          </Link>
          <Link href="/data-prefetch">
            <a className="nav-link">Data Prefetch</a>
          </Link>
        </NavHeader>
        <NavHeader>
          <a className="nav-link" />

          <a className="nav-link" onClick={this.logout}>
            <FormattedMessage {...messages.logout} />
          </a>
        </NavHeader>
      </NavBar>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: evt => {
      dispatch(logout());
      Router.push('/login');
    },
  };
};

const withConnect = connect(null, mapDispatchToProps);
const withSaga = injectSaga({ key: 'logout', saga });

export default compose(withConnect, withSaga)(Header);
