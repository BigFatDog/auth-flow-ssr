/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = state => state.get('home');

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.get('username'));

const makeSelectUserRepos = () =>
  createSelector(selectHome, homeState =>
    homeState.getIn(['userData', 'repositories'])
  );

export { selectHome, makeSelectUsername, makeSelectUserRepos };
