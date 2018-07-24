export default class JWT_AUTH {

  setToken(tokenValue) {
    sessionStorage.setItem('jwt_id', tokenValue);
  }

  getToken() {
    return sessionStorage.getItem('jwt_id');
  }

  removeToken() {
    sessionStorage.removeItem('jwt_id');
  }

  loggedIn() {
    return sessionStorage.getItem('jwt_id') ? true : false;
  }

}