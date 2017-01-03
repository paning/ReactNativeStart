import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Globle from '../../CommonComponents/Globle';
import Colors from '../../CommonComponents/Colors';
import Styles from '../../CommonComponents/CommonStyles';
import Section from './../Section';
import KServices from '../../NetworkService/KalixServices';

export default class ContactsViewComponent extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    model: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={Styles.container}>
        <Section>
          <View style={Styles.sectionLineView}>
            <View style={Styles.sectionLine}>
              <View style={Styles.sectionLineLeftView}>
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
              <View style={Styles.sectionLineRightView}>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.sectionLineContentText}>{this.props.model.loginName}</Text>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLine}>
              <View style={Styles.sectionLineLeftView}>
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
              <View style={Styles.sectionLineRightView}>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.sectionLineContentText}>{this.props.model.name}</Text>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLine}>
              <View style={Styles.sectionLineLeftView}>
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
              <View style={Styles.sectionLineRightView}>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.sectionLineContentText}>{this.props.model.email}</Text>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLine}>
              <View style={Styles.sectionLineLeftView}>
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
              <View style={Styles.sectionLineRightView}>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.sectionLineContentText}>{this.props.model.phone}</Text>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLine}>
              <View style={Styles.sectionLineLeftView}>
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
              <View style={Styles.sectionLineRightView}>
                <View style={{ flex: 1 }}>
                  <Text style={Styles.sectionLineContentText}>{this.props.model.mobile}</Text>
                </View>
              </View>
            </View>
          </View>
        </Section>
        <Section>
          <View style={Styles.sectionLineView}>
            <View style={Styles.sectionLine}>
              <View style={Styles.sectionLineLeftView}>
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
              <TouchableOpacity style={Styles.sectionLineRightView}>
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                    {this.props.model.org}
                  </Text>
                </View>
                <View style={{ width: 24, paddingLeft: 10 }}>
                  <Icon
                    name={'angle-right'}
                    size={24}
                    color={Colors.sectionLineIconColor}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={Styles.sectionLine}>
              <View style={Styles.sectionLineLeftView}>
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
              <View style={Styles.sectionLineRightView}>
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                    {this.props.model.duty}
                  </Text>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLine}>
              <View style={Styles.sectionLineLeftView}>
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
              <View style={Styles.sectionLineRightView}>
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                    {this.props.model.role}
                  </Text>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLine}>
              <View style={Styles.sectionLineLeftView}>
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
              <View style={Styles.sectionLineRightView}>
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                    {this.props.model.workGroup}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Section>
      </ScrollView>
    );
  }
}
