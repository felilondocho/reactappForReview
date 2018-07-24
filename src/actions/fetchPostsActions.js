import {
  SUCCESS_FETCH_POSTS,
  FAIL_FETCH_POSTS,
  REQUEST_POST,
} from './actionTypes';

import JWB_AUTH from '../lib/jwt_auth';

var jwt_instance = new JWB_AUTH();

export function fetchPosts(currentInitChunk, currentEndChunk) {
  return dispatch => {
    dispatch(requestPosts());
    return fetch("http://localhost:3000/getPosts", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': jwt_instance.getToken(),
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
      dispatch(failedFetch("Server error"));
    });
  };
}

const requestPosts = () => ({
  type: REQUEST_POST,
})

const successfulFetch = payload => ({
  type: SUCCESS_FETCH_POSTS, payload,
});

const failedFetch = error => ({
  type: FAIL_FETCH_POSTS, payload: error,
});
