import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESSFUL,
  LOG_IN_FAIL,
  CHECK_INITIAL_TOKEN,
} from './actionTypes';

import JWB_AUTH from '../lib/jwt_auth';
import apiService from '../lib/apiService';

const sendLogInInfo = () => ({
  type: LOG_IN_REQUEST,
});

const successfulLogIn = (jwtId) => {
  JWB_AUTH.setToken(jwtId);
  return { type: LOG_IN_SUCCESSFUL };
};

const failedLogIn = error => ({
  type: LOG_IN_FAIL, payload: error,
});

export function logIn(logInInfo) {
  return ((dispatch) => {
    dispatch(sendLogInInfo());
    return fetch('http://localhost:3000/login', apiService(logInInfo))
      .then(response => Promise.all([response.ok, response.text()]))
      .then(([responseOk, body]) => {
        if (responseOk) {
          dispatch(successfulLogIn(body));
        } else {
          dispatch(failedLogIn(body));
        }
      })
      .catch(() => {
        dispatch(failedLogIn('Server error'));
      });
  });
}

export const checkToken = () => ({
  type: CHECK_INITIAL_TOKEN,
  payload: JWB_AUTH.loggedIn(),
});
