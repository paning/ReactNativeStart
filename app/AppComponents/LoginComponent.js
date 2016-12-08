import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';

import KServices from '../NetworkService/KalixServices';

const logo = require('../image/logo.png');

const LoginStyles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ffffff',
  },

  TextInputView: {
    marginTop: 10,
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: '#000000',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  TextInput: {
    backgroundColor: '#ffffff',
    height: 45,
    margin: 18,
  },

  loginText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  loginTextView: {
    marginTop: 10,
    height: 50,
    backgroundColor: '#3281DD',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class LoginComponent extends Component {
  static propTypes = {
    didLogin: React.PropTypes.func,
    didLogout: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: 'admin',
      password: '123',
      logining: false,
      loginError: null,
    };
  }

  onPressLogin() {
    // 正在登录，点击无效
    if (this.state.logining) return;

    this.setState({
      logining: true,
      loginError: null,
    });

    KServices.login(this.state.userName, this.state.password)
      .then(response =>
        response.text(),
      )
      .then((responseText) => {
        this.setState({
          logining: false,
        });

        if (responseText.indexOf('globle-custom.js') >= 0) {
          if (this.props.didLogin) {
            this.props.didLogin();
          }
        } else {
          const msg = JSON.parse(responseText);
          if (!msg.success) {
            alert(msg.message);
          } else {
            this.props.didLogin();
          }
        }
      })
      .catch((error) => {
        this.setState({
          logining: false,
        });
        alert(error);
      })
      .done(() => {
        // TODO 先注释掉，回头考虑
        // this.setState({
        //   logining: false,
        // });
      });
  }

  onPressLogout() {
    return fetch('http://localhost:8181/logout')
      .then(response => response.text())
      .then(() => {
        if (this.props.didLogout) {
          this.props.didLogout();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={LoginStyles.loginview}>
        <View
          style={{ flexDirection: 'row', height: 100, marginTop: 1, justifyContent: 'center', alignItems: 'flex-start' }}
        >
          <Image source={logo} />
        </View>

        <View style={{ marginTop: 80 }}>
          <View style={LoginStyles.TextInputView}>
            <TextInput
              style={LoginStyles.TextInput} underlineColorAndroid="transparent" placeholder="输入用户名/注册手机号"
              value={this.state.userName}
              onChangeText={(text) => {
                this.setState({ userName: text });
              }
              }
            />
          </View>

          <View style={LoginStyles.TextInputView}>
            <TextInput
              style={LoginStyles.TextInput} underlineColorAndroid="transparent" secureTextEntry placeholder="输入密码"
              value={this.state.password}
              onChangeText={(text) => {
                this.setState({ password: text });
              }
              }
            />
          </View>

          <Button
            onPress={() => this.onPressLogin()}
            raised
            icon={{ name: 'cached' }}
            title="登录"
            buttonStyle={LoginStyles.loginTextView}
            textStyle={LoginStyles.loginText}
          />

          <Text style={{ color: '#4A90E2', textAlign: 'center', marginTop: 10 }} onPress={() => this.onPressLogout()}>忘记密码？</Text>
        </View>
      </View>
    );
  }
}
