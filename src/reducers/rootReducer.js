import { combineReducers } from 'redux';

import { LOG_OUT } from '../actions/actionTypes';
import logIn from './logIn';
import fetchPosts from './fetchPosts';
import fetchComments from './fetchComments';

const appReducer = combineReducers({
  logIn,
  fetchPosts,
  fetchComments,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;