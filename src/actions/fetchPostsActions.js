import {
  SUCCESS_FETCH_POSTS,
  FAIL_FETCH_POSTS,
  REQUEST_POST,
} from './actionTypes';

import JWB_AUTH from '../lib/jwt_auth';
import apiService from '../lib/apiService';

const requestPosts = () => ({
  type: REQUEST_POST,
});

const successfulFetch = payload => ({
  type: SUCCESS_FETCH_POSTS, payload,
});

const failedFetch = error => ({
  type: FAIL_FETCH_POSTS, payload: error,
});

export default function fetchPosts() {
  return ((dispatch, getState) => {
    const currentState = getState().fetchPosts;
    const { currentInitChunk } = currentState;
    const { currentEndChunk } = currentState;
    dispatch(requestPosts());
    return fetch('http://localhost:3000/getPosts',
      apiService({ currentInitChunk, currentEndChunk }, JWB_AUTH.getToken()))
      .then(response => Promise.all([response.ok, response.json()]))
      .then(([responseOk, body]) => {
        if (responseOk) {
          dispatch(successfulFetch(body));
        } else {
          dispatch(failedFetch(body.error));
        }
      })
      .catch(() => {
        dispatch(failedFetch('Server error'));
      });
  });
}
