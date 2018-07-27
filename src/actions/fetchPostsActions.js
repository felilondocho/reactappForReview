import {
  SUCCESS_FETCH_POSTS,
  FAIL_FETCH_POSTS,
  REQUEST_POST,
} from './actionTypes';

import JWB_AUTH from '../lib/jwt_auth';

let requestPosts;
let successfulFetch;
let failedFetch;

export default function fetchPosts(currentInitChunk, currentEndChunk) {
  return ((dispatch) => {
    dispatch(requestPosts());
    return fetch('http://localhost:3000/getPosts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: JWB_AUTH.getToken(),
      },
      body: JSON.stringify({ currentInitChunk, currentEndChunk }),
    })
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

requestPosts = () => ({
  type: REQUEST_POST,
});

successfulFetch = payload => ({
  type: SUCCESS_FETCH_POSTS, payload,
});

failedFetch = error => ({
  type: FAIL_FETCH_POSTS, payload: error,
});
