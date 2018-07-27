import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESSFUL,
  LOG_IN_FAIL,
  CHECK_INITIAL_TOKEN,
} from './actionTypes';

import JWB_AUTH from '../lib/jwt_auth';

let sendLogInInfo;
let successfulLogIn;
let failedLogIn;

export function logIn(logInInfo) {
  return ((dispatch) => {
    dispatch(sendLogInInfo());
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
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
        dispatch(failedLogIn('Server error'));
      });
  });
}

sendLogInInfo = () => ({
  type: LOG_IN_REQUEST,
});

successfulLogIn = (jwtId) => {
  JWB_AUTH.setToken(jwtId);
  return { type: LOG_IN_SUCCESSFUL };
};

failedLogIn = error => ({
  type: LOG_IN_FAIL, payload: error,
});

export function checkToken() {
  return {
    type: CHECK_INITIAL_TOKEN,
    payload: JWB_AUTH.loggedIn(),
  };
}
