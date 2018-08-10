import {
  REQUEST_COMMENTS,
  SUCCESS_FETCH_COMMENTS,
  FAIL_FETCH_COMMENTS,
} from './actionTypes';

import JWB_AUTH from '../lib/jwt_auth';
import apiService from '../lib/apiService';

const requestComments = () => ({
  type: REQUEST_COMMENTS,
});

const successfulFetchComments = payload => ({
  type: SUCCESS_FETCH_COMMENTS, payload: { [payload[0].postId]: payload },
});

const failedFetchComments = error => ({
  type: FAIL_FETCH_COMMENTS, payload: error,
});

export default function fetchComments(postId) {
  return ((dispatch) => {
    dispatch(requestComments());
    return fetch('http://localhost:3000/getComments/',
      apiService(postId, JWB_AUTH.getToken()))
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
