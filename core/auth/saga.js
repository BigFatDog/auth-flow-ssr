import { call, put, fork, race, takeEvery } from 'redux-saga/effects';
import Router from 'next/router';

import { verifyTokenSuccess, verifyTokenFailure } from './actions';

import { post } from '../reqeust/post';
import {
  VERIFY_TOKEN_REQUEST,
  REQUEST_TIMEOUT,
  VERIFY_TOKEN_FAILURE,
} from './constants';

function* verifyToken() {
  try {
    const res = yield call(post, '/verifyToken');

    if (res) {
      const {
        userId,
        userName,
        token,
        refreshToken,
        success,
        message,
      } = res.data;

      if (success === true) {
        yield put(
          verifyTokenSuccess({ userId, userName, token, refreshToken })
        );
      } else {
        yield put(verifyTokenFailure({ errorMsg: message }));
      }
    } else {
      yield put(verifyTokenFailure({ errorMsg: REQUEST_TIMEOUT }));
    }
  } catch (err) {
    yield put(verifyTokenFailure({ errorMsg: err }));
  }
}

function* logout() {
  Router.push('/login');
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* verify() {
  yield fork(takeEvery, VERIFY_TOKEN_REQUEST, verifyToken);
  yield fork(takeEvery, VERIFY_TOKEN_FAILURE, logout);
}
