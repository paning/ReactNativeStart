import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import KServices from './app/NetworkService/KalixServices';
import LoginComponent from './app/AppComponents/LoginComponent';
import CommonComponents from './app/CommonComponents/CommonComponents';
import RootTab from './app/AppComponents/RootTabComponent.android';

const LoginState = {
  pending: 0,
  login: 1,
  logout: -1,
};

export default class ReactNativeStart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userState: LoginState.pending,
    };
  }

  componentWillMount() {
    this.setState({
      userState: LoginState.logout,
    });
  }

  didLogin() {
    this.setState({
      userState: LoginState.login,
    });

    KServices.addListener('didLogout', () => {
      this.setState({
        userState: LoginState.logout,
      });
    });
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
