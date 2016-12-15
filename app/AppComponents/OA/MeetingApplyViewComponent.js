import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import CommonComponents from '../../CommonComponents/CommonComponents';
import Style from '../../CommonComponents/CommonStyles';
import Section from '../Section';
import KServices from '../../NetworkService/KalixServices';

export default class MeetingApplyViewComponent extends Component {
  static propTypes = {
    entityId: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      title: '',                // 名称
      orgName: '',              // 申请部门
      meetingroomId: 17501,     // 会议地点
      meetingroomName: null,    // 会议地点
      meetingTopic: '',         // 会议主题
      requireType: 0,           // 宣传需求（企划中心）
      host: '',                 // 主持人
      meetingDate: '',          // 使用时间(天)
      beginDate: '',            // 使用时间(小时、分、秒)
      endDate: '',              // 使用时间(小时、分、秒)
      participant: '',          // 参会人员
      attendance: '',           // 出席人数
      equipmentRequirement: '', // 设备要求
      securityPerson: '',       // 联系人（安全责任人）
      securityTel: '',          // 手机号码
      createBy: '',             // 申请人
      operatorPhone: '',        // 联系电话
      currentNode: '',          // 当前节点
      status: 1,                // 状态
      auditResult: '',          // 审批状态
      schoolAdminUser: '',      // 校务部行政事务办主管
      schoolUser: '',           // 校务部副部长
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const that = this;
    const path = `${KServices.restPath()}/meetingapplys/${this.props.entityId}`;
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
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>会议地点</Text>
            <Text style={Style.sectionLineContentText}>{this.state.meetingroomName}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>会议主题</Text>
            <Text style={Style.sectionLineContentText}>{this.state.meetingTopic}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>宣传需求（企划中心）</Text>
            <Text style={Style.sectionLineContentText}>{this.state.requireType}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>主持人</Text>
            <Text style={Style.sectionLineContentText}>{this.state.host}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>使用时间</Text>
            <Text style={Style.sectionLineContentText}>{this.state.meetingDate}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>参会人员</Text>
            <Text style={Style.sectionLineContentText}>{this.state.participant}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>出席人数</Text>
            <Text style={Style.sectionLineContentText}>{this.state.attendance}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>设备要求</Text>
            <Text style={Style.sectionLineContentText}>{this.state.equipmentRequirement}</Text>
          </View>
        </Section>
        <Section>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>联系人（安全责任人）</Text>
            <Text style={Style.sectionLineContentText}>{this.state.securityPerson}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>手机号码</Text>
            <Text style={Style.sectionLineContentText}>{this.state.securityTel}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>申请人</Text>
            <Text style={Style.sectionLineContentText}>{this.state.createBy}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>联系电话</Text>
            <Text style={Style.sectionLineContentText}>{this.state.operatorPhone}</Text>
          </View>
        </Section>
        <Section>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>校务部行政事务办主管</Text>
            <Text style={Style.sectionLineContentText}>{this.state.schoolAdminUser}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>校务部副部长</Text>
            <Text style={Style.sectionLineContentText}>{this.state.schoolUser}</Text>
          </View>
        </Section>
      </View>
    );
  }
}
