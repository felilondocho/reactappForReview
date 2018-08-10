import { LOG_OUT } from './actionTypes';

import JWB_AUTH from '../lib/jwt_auth';

export default function logOut() {
  JWB_AUTH.removeToken();
  return { type: LOG_OUT };
}
