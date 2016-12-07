import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

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
  }

  didLogout() {
    this.setState({
      userState: LoginState.logout,
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
        cp = <RootTab />;
      }
        break;
      case LoginState.logout: {
        cp = <LoginComponent didLogin={() => this.didLogin()} didLogout={() => this.didLogout()} />;
      }
        break;

      default:
    }

    return cp;
  }
}

AppRegistry.registerComponent('ReactNativeStart', () => ReactNativeStart);
