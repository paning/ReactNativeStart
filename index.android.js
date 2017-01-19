import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
} from 'react-native';

import Globle from './app/CommonComponents/Globle';
import KServices from './app/NetworkService/KalixServices';
import LoginComponent from './app/AppComponents/LoginComponent';
import CommonComponents from './app/CommonComponents/CommonComponents';
import RootTab from './app/AppComponents/RootTabComponent.android';
import HXModule from './app/IM/Module/HXModule';

const LoginState = {
  pending: 0,
  login: 1,
  logout: -1,
};

export default class ReactNativeStart extends Component {
  static loadPath(userName) {
    const jsonstr = {};
    jsonstr.loginName = userName;

    const path = `${KServices.restPath()}/users?jsonstr=${JSON.stringify(jsonstr)}`;
    return encodeURI(path);
  }

  constructor(props) {
    super(props);
    this.state = {
      userState: LoginState.pending,
      id: 0,
      creationDate: '',
      createBy: '',
      updateBy: '',
      updateDate: '',
      version: 0,
      loginName: '',
      name: '',
      email: '',
      phone: '',
      mobile: '',
      loginIp: '',
      loginDate: 1481953571263,
      available: 1,
      position: 1,
      org: '',
      duty: '',
      role: '',
      workGroup: '',
      sex: '',
      code: 0,
      icon: '',
    };
  }

  componentWillMount() {
    this.setState({
      userState: LoginState.logout,
    });
  }

  loadData(userName) {
    const that = this;
    const promise = KServices.fetchPromise(ReactNativeStart.loadPath(userName));
    promise
      .then(value => value.text())
      .then((responseText) => {
        const json = JSON.parse(responseText);
        if (json.totalCount > 0) {
          const model = json.data[0];

          HXModule.initHXSDK();
          HXModule.logout(() => {
            HXModule.login('zym', '123',
              () => {
                this.setState({
                  userState: LoginState.login,
                });
                KServices.addListener('didLogout', () => {
                  that.setState({
                    userState: LoginState.logout,
                  });
                });
              },
              (msg) => {
                alert(msg + 'ds');
              });
          }, msg => alert(msg));
        }
      })
      .catch((err) => {
        alert(`系统错误！！！${err}`);
      })
      .done(() => {
        that.setState({
          loaded: false,
        });
      });
  }

  didLogin() {
    try {
      AsyncStorage.getItem(
        Globle.USER_NAME,
        (error, result) => {
          if (error) {
            alert(`取值失败:${error}`);
          } else {
            this.loadData(result);
          }
        },
      );
    } catch (error) {
      alert(`失败${error}`);
    }
  }

  render() {
    let cp;
    switch (this.state.userState) {
      case LoginState.pending: {
        cp = CommonComponents.renderLoadingView();
      }
        break;
      case LoginState.login: {
        cp = <RootTab didLogout={() => this.didLogout()} />;
      }
        break;
      case LoginState.logout: {
        cp = <LoginComponent didLogin={() => this.didLogin()} />;
      }
        break;

      default:
    }

    return cp;
  }
}

AppRegistry.registerComponent('ReactNativeStart', () => ReactNativeStart);
