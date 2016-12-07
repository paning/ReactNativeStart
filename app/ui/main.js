import React, { Component } from 'react';
import {
  ToolbarAndroid,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import EditView from '../lib/EditView';
import PasswordView from '../lib/PasswordView';
import LoginButton from '../lib/LoginButton';
import LoginSuccess from '../ui/LoginSuccess';
import NetUitl from '../lib/NetUtil';
export default class LoginActivity extends Component {
  constructor(props) {
    super(props);
    this.userName = "";
    this.password = "";
  }

  render() {
      return (

    <View style={LoginStyles.loginview}>
     <View   style={{flexDirection: 'row',height:100,marginTop:1,
        justifyContent: 'center',
        alignItems: 'flex-start',}}>
       <Image source={require('../image/logo.png')}/>
     </View>
     <View style={{marginTop:80}}>
       <EditView  name='输入用户名/注册手机号' text='admin' onChangeText={(text) => {
            this.userName = text;
        }}/>
       <PasswordView name='输入密码' text='123' onChangeText={(text) => {
            this.password = text;
        }}/>
        <LoginButton name='登录' onPressCallback={this.onPressCallback}/>
        <Text style={{color:"#4A90E2",textAlign:'center',marginTop:10}} onPress={this.getMoviesFromApiAsync} >忘记密码？</Text>
      </View>
     </View>
   )
  }

  getMoviesFromApiAsync() {
    return fetch('http://localhost:8181/camel/rest/users?_dc=1478855327361&jsonStr=%7B%22loginName%22%3A%22%22%2C%22name%22%3A%22%22%7D&page=1&start=0&limit=20')
      .then((response) => response.text())
      .then((responseText) => {
        alert(responseText);
        //return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onPressCallback = () => {
    let formData = new FormData();
    formData.append("username",this.userName);
    formData.append("password",this.password);
    let url = "http://localhost:8181/login.jsp";
    NetUitl.postJson(url,formData,(responseText) => {
          alert(responseText);
          //this.onLoginSuccess();
    })


  };

  //跳转到第二个页面去
    onLoginSuccess(){
     const { navigator } = this.props;
     if (navigator) {
       navigator.push({
         name : 'LoginSuccess',
         component : LoginSuccess,
       });
     }
   }

}

class loginLineView extends Component {
  render() {
    return (
        <Text >
            没有帐号
          </Text>
    );
  }
}

const LoginStyles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 30,
      backgroundColor: '#ffffff',
  },
});
