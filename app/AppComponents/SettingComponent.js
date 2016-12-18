import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Globle from '../CommonComponents/Globle';
import Colors from '../CommonComponents/Colors';
import Styles from '../CommonComponents/CommonStyles';
import Section from './Section';
import KServices from '../NetworkService/KalixServices';

export default class SettingComponent extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    model: React.PropTypes.object,
  };

  static loadPath(userName) {
    const jsonstr = {};
    jsonstr.loginName = userName;

    const path = `${KServices.restPath()}/users?jsonstr=${JSON.stringify(jsonstr)}`;
    return encodeURI(path);
  }

  constructor(props) {
    super(props);

    this.state = {
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

  componentDidMount() {
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

  loadData(userName) {
    const that = this;
    const promise = KServices.fetchPromise(SettingComponent.loadPath(userName));
    promise
      .then(value => value.text())
      .then((responseText) => {
        const json = JSON.parse(responseText);
        if (json.totalCount > 0) {
          const model = json.data[0];
          that.setState(model);
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

  logoutOnPress() {
    KServices.logout();
  }

  render() {
    return (
      <ScrollView style={Styles.container}>
        <Section>
          <View style={Styles.sectionLine}>
            <View style={Styles.sectionLineRightView}>
              <View style={{ width: 40, alignItems: 'center' }}>
                <Icon
                  name={'user-circle'}
                  size={24}
                  style={{ paddingRight: 10 }}
                  color={Colors.blue}
                />
              </View>
              <Text style={Styles.sectionLineTitleText}>登录名</Text>
            </View>
            <Text style={Styles.sectionLineContentText}>{this.state.loginName}</Text>
          </View>
          <View style={Styles.sectionLine}>
            <View style={Styles.sectionLineRightView}>
              <View style={{ width: 40, alignItems: 'center' }}>
                <Icon
                  name={'user-circle-o'}
                  size={24}
                  style={{ paddingRight: 10 }}
                  color={Colors.blue}
                />
              </View>
              <Text style={Styles.sectionLineTitleText}>姓名</Text>
            </View>
            <Text style={Styles.sectionLineContentText}>{this.state.name}</Text>
          </View>
          <View style={Styles.sectionLine}>
            <View style={Styles.sectionLineRightView}>
              <View style={{ width: 40, alignItems: 'center' }}>
                <Icon
                  name={'envelope-o'}
                  size={24}
                  style={{ paddingRight: 10 }}
                  color={Colors.blue}
                />
              </View>
              <Text style={Styles.sectionLineTitleText}>邮箱</Text>
            </View>
            <Text style={Styles.sectionLineContentText}>{this.state.email}</Text>
          </View>
          <View style={Styles.sectionLine}>
            <View style={Styles.sectionLineRightView}>
              <View style={{ width: 40, alignItems: 'center' }}>
                <Icon
                  name={'phone'}
                  size={24}
                  style={{ paddingRight: 10 }}
                  color={Colors.blue}
                />
              </View>
              <Text style={Styles.sectionLineTitleText}>电话</Text>
            </View>
            <Text style={Styles.sectionLineContentText}>{this.state.phone}</Text>
          </View>
          <View style={Styles.sectionLine}>
            <View style={Styles.sectionLineRightView}>
              <View style={{ width: 40, alignItems: 'center' }}>
                <Icon
                  name={'podcast'}
                  size={24}
                  style={{ paddingRight: 10 }}
                  color={Colors.blue}
                />
              </View>
              <Text style={Styles.sectionLineTitleText}>手机</Text>
            </View>
            <Text style={Styles.sectionLineContentText}>{this.state.mobile}</Text>
          </View>
        </Section>
        <Section>
          <View style={Styles.sectionLine}>
            <View style={Styles.sectionLineRightView}>
              <View style={{ width: 40, alignItems: 'center' }}>
                <Icon
                  name={'cogs'}
                  size={24}
                  style={{ paddingRight: 10 }}
                  color={Colors.blue}
                />
              </View>
              <Text style={Styles.sectionLineTitleText}>机构</Text>
            </View>
            <Text style={Styles.sectionLineContentText}>{this.state.org}</Text>
          </View>
          <View style={Styles.sectionLine}>
            <View style={Styles.sectionLineRightView}>
              <View style={{ width: 40, alignItems: 'center' }}>
                <Icon
                  name={'address-card'}
                  size={24}
                  style={{ paddingRight: 10 }}
                  color={Colors.blue}
                />
              </View>
              <Text style={Styles.sectionLineTitleText}>职务</Text>
            </View>
            <Text style={Styles.sectionLineContentText}>{this.state.duty}</Text>
          </View>
          <View style={Styles.sectionLine}>
            <View style={Styles.sectionLineRightView}>
              <View style={{ width: 40, alignItems: 'center' }}>
                <Icon
                  name={'user-plus'}
                  size={24}
                  style={{ paddingRight: 10 }}
                  color={Colors.blue}
                />
              </View>
              <Text style={Styles.sectionLineTitleText}>角色</Text>
            </View>
            <Text style={Styles.sectionLineContentText}>{this.state.role}</Text>
          </View>
          <View style={Styles.sectionLine}>
            <View style={Styles.sectionLineRightView}>
              <View style={{ width: 40, alignItems: 'center' }}>
                <Icon
                  name={'group'}
                  size={24}
                  style={{ paddingRight: 10 }}
                  color={Colors.blue}
                />
              </View>
              <Text style={Styles.sectionLineTitleText}>工作组</Text>
            </View>
            <Text style={Styles.sectionLineContentText}>{this.state.workGroup}</Text>
          </View>
        </Section>

        <TouchableOpacity
          onPress={() => this.logoutOnPress()}
          style={{ margin: 10, height: 50, backgroundColor: Colors.mainColor, borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold' }}>退出登录</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
