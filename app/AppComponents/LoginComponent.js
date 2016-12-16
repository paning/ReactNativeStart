import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

import Colors from '../CommonComponents/Colors';
import KServices from '../NetworkService/KalixServices';

const logo = require('../image/logo.png');

const LoginStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
    backgroundColor: Colors.mainBackGroundColor,
  },

  imageView: {
    marginBottom: 80,
    alignItems: 'center',
  },

  TextInputView: {
    marginTop: 10,
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  TextInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: 45,
    margin: 10,
  },

  loginText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginTextView: {
    marginTop: 10,
    height: 50,
    backgroundColor: Colors.mainColor,
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
      <View style={LoginStyles.mainView}>
        <View style={LoginStyles.imageView}>
          <Image source={logo} style={{ height: 150, width: 300 }} />
        </View>

        <View style={LoginStyles.TextInputView}>
          <Icon
            name={'user'}
            size={20}
            style={{ paddingLeft: 10 }}
            color={Colors.mainColor}
          />
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
          <Icon
            name={'unlock-alt'}
            size={20}
            style={{ paddingLeft: 10 }}
            color={Colors.mainColor}
          />
          <TextInput
            style={LoginStyles.TextInput} underlineColorAndroid="transparent" secureTextEntry placeholder="输入密码"
            value={this.state.password}
            onChangeText={(text) => {
              this.setState({ password: text });
            }
              }
          />
        </View>

        <TouchableOpacity onPress={() => this.onPressLogin()} style={LoginStyles.loginTextView}>
          <Text style={LoginStyles.loginText}>登录</Text>
        </TouchableOpacity>

        <Text style={{ color: '#000000', textAlign: 'center', marginTop: 10 }} onPress={() => this.onPressLogout()}>忘记密码？</Text>
      </View>
    );
  }
}
