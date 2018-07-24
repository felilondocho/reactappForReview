import { LOG_OUT } from './actionTypes';

import JWB_AUTH from '../lib/jwt_auth';

var jwt_instance = new JWB_AUTH();

export function logOut() {
  jwt_instance.removeToken();
  return { type: LOG_OUT, };
}