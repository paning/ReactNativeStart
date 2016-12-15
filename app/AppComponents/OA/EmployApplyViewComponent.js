import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommonComponents from '../../CommonComponents/CommonComponents';
import Colors from '../../CommonComponents/Colors';
import Style from '../../CommonComponents/CommonStyles';
import Section from '../Section';
import KServices from '../../NetworkService/KalixServices';

export default class EmployApplyViewComponent extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    entityId: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      title: '',                // 名称
      orgName: '',              // 申请部门
      createBy: '',             // 申请人
      currentNode: '',          // 当前节点
      status: 1,                // 状态
      auditResult: '',          // 审批状态
      branchSchoolLeader: '',   // 分院领导审批
      schoolLeader: '',         // 校领导审批
      manpower: '',             // 人力资源部长签字
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const that = this;
    const path = `${KServices.restPath()}/employapplys/${this.props.entityId}`;
    const promise = KServices.fetchPromise(path);
    promise
      .then(value => value.text())
      .then((responseText) => {
        const model = JSON.parse(responseText);

        that.setState(model);
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

  personInfoOnPress() {
    this.props.navigator.push({ id: 'candidates', entityId: this.props.entityId });
  }

  render() {
    if (this.state.loaded) {
      return CommonComponents.renderLoadingView();
    }

    return (
      <View>
        <Section>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>名称</Text>
            <Text style={Style.sectionLineContentText}>{this.state.title}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>申请部门</Text>
            <Text style={Style.sectionLineContentText}>{this.state.orgName}</Text>
          </View>
        </Section>
        <Section>
          <TouchableOpacity onPress={() => this.personInfoOnPress()} style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>人员基本信息</Text>
            <Icon
              name={'angle-right'}
              size={24}
              style={{ padding: 10 }}
              color={Colors.sectionLineIconColor}
            />
          </TouchableOpacity>
        </Section>
        <Section>
          <TouchableOpacity onPress={() => this.personInfoOnPress()} style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>面试信息</Text>
            <Icon
              name={'angle-right'}
              size={24}
              style={{ padding: 10 }}
              color={Colors.sectionLineIconColor}
            />
          </TouchableOpacity>
        </Section>
        <Section>
          <TouchableOpacity onPress={() => this.personInfoOnPress()} style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>试讲信息</Text>
            <Icon
              name={'angle-right'}
              size={24}
              style={{ padding: 10 }}
              color={Colors.sectionLineIconColor}
            />
          </TouchableOpacity>
        </Section>
        <Section>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>分院领导审批</Text>
            <Text style={Style.sectionLineContentText}>{this.state.branchSchoolLeader}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>校领导审批</Text>
            <Text style={Style.sectionLineContentText}>{this.state.schoolLeader}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>人力资源部长签字</Text>
            <Text style={Style.sectionLineContentText}>{this.state.manpower}</Text>
          </View>
        </Section>
      </View>
    );
  }
}
