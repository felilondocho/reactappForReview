import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESSFUL,
  LOG_IN_FAIL,
  CHECK_INITIAL_TOKEN,
} from './actionTypes';

import JWB_AUTH from '../lib/jwt_auth';

var jwt_instance = new JWB_AUTH();

export function logIn(logInInfo) {
  return dispatch => {
    dispatch(sendLogInInfo());
    return fetch("http://localhost:3000/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logInInfo),
    })
    .then(response => Promise.all([response.ok, response.text()]))
    .then(([responseOk, body]) => {
      if (responseOk) {
        dispatch(successfulLogIn(body));
      } else {
        dispatch(failedLogIn(body));
      }
    })
    .catch(() => {
      dispatch(failedLogIn("Server error"));
    });
  };
}

const sendLogInInfo = () => ({
  type: LOG_IN_REQUEST,
});

const successfulLogIn = jwt_id => {
  jwt_instance.setToken(jwt_id);
  return { type: LOG_IN_SUCCESSFUL, };
}

const failedLogIn = error => ({
  type: LOG_IN_FAIL, payload: error,
});

export function checkToken() {
  return {
    type: CHECK_INITIAL_TOKEN,
    payload: jwt_instance.loggedIn(),
  };
};