import { EventEmitter } from 'events';

// const SERVER_PATH = 'http://info.sokylin.com.cn';
// const SERVER_PATH = 'http://192.168.137.1:8181';
const SERVER_PATH = 'http://172.18.82.2:8181';
const REST_PATH = '/camel/rest';
const LOGIN_PATH = `${SERVER_PATH}/login.jsp`;

class KalixServices extends EventEmitter {
  restPath() {
    return SERVER_PATH + REST_PATH;
  }

  tokenHeader() {
    const tHeader = {
      Accept: '*/*',
      'Content-Type': 'application/json;charset=utf-8',
    };

    return tHeader;
  }


  login(username, password) {
    const fetchOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&password=${password}`,
    };

    return (
      fetch(LOGIN_PATH, fetchOptions)
    );
  }

  loginRequest(username, password) {
    const fetchOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&password=${password}`,
    };

    return (
      fetch(LOGIN_PATH, fetchOptions)
    );
  }

  logout() {
    SingleKalixServices.fetchPromise(`${SERVER_PATH}/logout`);
    SingleKalixServices.emit('didLogout');
  }

  fetchPromise(url) {
    const fetchOptions = {
      method: 'get',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json;charset=utf-8',
      },
    };

    return (
      fetch(url, fetchOptions)
    );
  }
}

const SingleKalixServices = new KalixServices();

module.exports = SingleKalixServices;
