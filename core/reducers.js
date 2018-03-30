import { combineReducers } from 'redux-immutable';
import languageProviderReducer from '../components/LanguageProvider/reducer';
import AuthReducer from './auth/reducer';
import SystemReducer from './system/reducers';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    auth: AuthReducer,
    system: SystemReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  });
}
