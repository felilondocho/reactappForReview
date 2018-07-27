import {
  REQUEST_COMMENTS,
  SUCCESS_FETCH_COMMENTS,
  FAIL_FETCH_COMMENTS,
} from './actionTypes';

import JWB_AUTH from '../lib/jwt_auth';

let requestComments;
let successfulFetchComments;
let failedFetchComments;

export default function fetchComments(postId) {
  return ((dispatch) => {
    dispatch(requestComments());
    return fetch('http://localhost:3000/getComments/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: JWB_AUTH.getToken(),
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
        dispatch(failedFetchComments('Server error'));
      });
  });
}

requestComments = () => ({
  type: REQUEST_COMMENTS,
});

successfulFetchComments = payload => ({
  type: SUCCESS_FETCH_COMMENTS, payload: { [payload[0].postId]: payload },
});

failedFetchComments = error => ({
  type: FAIL_FETCH_COMMENTS, payload: error,
});
