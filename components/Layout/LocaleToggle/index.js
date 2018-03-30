/*
 *
 * LanguageToggle
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { changeLocale } from '../../LanguageProvider/actions';
import { makeSelectLocale } from '../../LanguageProvider/selectors';

import messages from './messages';

const CN_FLAG = '/static/modules/common/flag_zh.png';
const EN_FLAG = '/static/modules/common/flag_en.png';

export class LocaleToggle extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { locale } = this.props;
    const flag = locale === 'zh' ? CN_FLAG : EN_FLAG;

    return (
      <ul style={{ listStyle: 'none', position: 'fixed', left: 20, top: 20 }}>
        <li className="dropdown">
          <a
            href="javascript:void(0)"
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-expanded="false"
          >
            <img src={flag} />
          </a>
          <ul
            id="language-dropdown"
            className="dropdown-menu bullet pull-center"
            role="menu"
          >
            <li onClick={evt => this.props.onLocaleToggle(evt, 'zh')}>
              <a
                href="javascript:void(0)"
                className="capitalize action-lang-zh"
              >
                <img src={CN_FLAG} /> <FormattedMessage {...messages.zh} />
              </a>
            </li>
            <li onClick={evt => this.props.onLocaleToggle(evt, 'en')}>
              <a
                href="javascript:void(0)"
                className="capitalize action-lang-en"
              >
                <img src={EN_FLAG} /> <FormattedMessage {...messages.en} />
              </a>
            </li>
          </ul>
        </li>
      </ul>
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: (evt, locale) => dispatch(changeLocale(locale)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
