import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import isUndefined from 'lodash/isUndefined';
import axios from 'axios';
import Router from 'next/router';

import { post } from './reqeust/post';
import createReducer from './reducers';

import { loginSuccess, loginFailure } from './auth/actions';
import { webServerDown } from './system/actions';

const sagaMiddleware = createSagaMiddleware();
let reduxStore = null;

function create(initialState = {}) {
  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    process.browser &&
    typeof window === 'object'
      ? composeWithDevTools
      : compose;

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  return store;
}

export default function initRedux(initialState) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse store on the client-side
  if (!reduxStore) {
    reduxStore = create(initialState);

    // general interceptors for all xhr
    axios.interceptors.request.use(
      function(config) {
        const token = reduxStore.getState('auth').get('token');
        config.headers.Authorization = token ? `Bearer ${token}` : null;

        return config;
      },
      function(err) {
        return Promise.reject(err);
      }
    );

    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        // net::ERR_NAME_NOT_RESOLVED
        // net::ERR_CONNECTION_REFUSED
        // net::ERR_BLOCKED_BY_CLIENT
        // net::ERR_TUNNEL_CONNECTION_FAILED (when using proxy)
        if (isUndefined(error.response)) {
          if (error.message.includes('Network Error')) {
            reduxStore.dispatch(webServerDown({ errorMsg: error.message }));
            return Promise.reject(error.message);
          }
        }
        if (error.response.status === 401) {
          console.log('unauthorized, logging out ...');
          reduxStore.dispatch(loginFailure({ errorMsg: error.message }));
          Router.push('/login');
        }

        return Promise.reject(error.response);
      }
    );

    // redux storage will be lost on page refresh.
    // so verify token during init
    post('/verifyToken')
      .then(tokeRes => {
        if (tokeRes.data.success === true) {
          const { userId, userName, token, refreshToken } = tokeRes.data;
          reduxStore.dispatch(
            loginSuccess({ userId, userName, token, refreshToken })
          );
        } else {
          reduxStore.dispatch(loginFailure({ errorMsg: tokeRes.data.message }));
        }
      })
      .catch(e => {
        reduxStore.dispatch(loginFailure({ errorMsg: e }));
      });
  }

  return reduxStore;
}
