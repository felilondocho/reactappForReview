export default class JWT_AUTH {
  static setToken(tokenValue) {
    sessionStorage.setItem('jwt_id', tokenValue);
  }

  static getToken() {
    return sessionStorage.getItem('jwt_id');
  }

  static removeToken() {
    sessionStorage.removeItem('jwt_id');
  }

  static loggedIn() {
    if (sessionStorage.getItem('jwt_id')) {
      return true;
    }
    return false;
  }
}
