import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import injectReducer from '../../core/runtime/injectReducer';
import injectSaga from '../../core/runtime/injectSaga';
import messages from './messages';
import { makeSelectUsername, makeSelectUserRepos } from './selectors';
import { changeUsername, loadRepos } from './actions';
import reducer from './reducer';
import saga from './saga';

import PostListQuery from './PostListQuery.graphql';
import { createStructuredSelector } from 'reselect';

class PostList extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { posts, userRepo } = this.props;
    const aList = posts || [];
    const bList = userRepo || [];
    const postList = aList.map(d => (
      <li className="list-group-item" key={d.id}>
        {d.title}
      </li>
    ));
    const repoList = bList.map(d => (
      <li className="list-group-item" key={d.id}>
        {d.name}
      </li>
    ));

    return (
      <div>
        <FormattedMessage {...messages.welcome} />

        <button
          onClick={evt => {
            this.props.onChangeUsername('BigFatDog');
            this.props.onSubmitForm(evt);
          }}
        >
          Test Saga
        </button>
        <ul className="list-group">{postList}</ul>
        <ul className="list-group">{repoList}</ul>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: name => dispatch(changeUsername(name)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  userRepo: makeSelectUserRepos(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

const withGraphQL = graphql(PostListQuery, {
  props: ({ data }) => {
    const { loading, error, posts } = data;
    if (error) throw new Error(error);
    return { loading, posts };
  },
});

export default compose(withGraphQL, withReducer, withSaga, withConnect)(
  PostList
);
