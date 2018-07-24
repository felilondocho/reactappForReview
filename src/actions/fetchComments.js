import {
  REQUEST_COMMENTS,
  SUCCESS_FETCH_COMMENTS,
  FAIL_FETCH_COMMENTS,
} from '../actions/actionTypes';

import JWB_AUTH from '../lib/jwt_auth';

var jwt_instance = new JWB_AUTH();

export function fetchComments(postId) {
  return dispatch => {
    dispatch(requestComments());
    return fetch("http://localhost:3000/getComments/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': jwt_instance.getToken(),
      },
      body: JSON.stringify(postId),
    })
    .then(response => Promise.all([response.ok, response.json()]))
    .then(([responseOk, body]) => {
      if (responseOk) {
        dispatch(successfulFetchComments(body));
      } else {
        dispatch(failedFetchComments(body.error));
      }
    })
    .catch(() => {
      dispatch(failedFetchComments("Server error"));
    });
  };
}

const requestComments = () => ({
  type: REQUEST_COMMENTS,
});

const successfulFetchComments = payload => ({
  type: SUCCESS_FETCH_COMMENTS, payload: { [payload[0].postId]: payload },
});

const failedFetchComments = error => ({
  type: FAIL_FETCH_COMMENTS, payload: error,
});