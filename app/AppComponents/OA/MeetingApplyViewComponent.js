import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import CommonComponents from '../../CommonComponents/CommonComponents';
import KServices from '../../NetworkService/KalixServices';

const styles = StyleSheet.create({
  cellContentView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },

  itemImg: {
    width: 88,
    height: 66,
    marginRight: 10,
  },

  itemRightContent: {
    flex: 1,
    flexDirection: 'column',
  },

  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },

  itemRightBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  userName: {
    flex: 1,
    fontSize: 14,
    color: '#87CEFA',
    marginTop: 5,
    marginRight: 5,
  },

  timeAgo: {
    fontSize: 14,
    color: '#aaaaaa',
    marginTop: 5,
  },
});

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
      <View style={styles.container}>
        <Text style={styles.text}>名称：{this.state.title}</Text>
        <Text style={styles.text}>申请部门：{this.state.orgName}</Text>
        <Text style={styles.text}>会议地点：{this.state.meetingroomName}</Text>
        <Text style={styles.text}>会议主题：{this.state.meetingTopic}</Text>
        <Text style={styles.text}>宣传需求（企划中心）：{this.state.requireType}</Text>
        <Text style={styles.text}>主持人：{this.state.host}</Text>
        <Text style={styles.text}>使用时间：{this.state.meetingDate}</Text>
        <Text style={styles.text}>参会人员：{this.state.participant}</Text>
        <Text style={styles.text}>出席人数：{this.state.attendance}</Text>
        <Text style={styles.text}>设备要求：{this.state.equipmentRequirement}</Text>
        <Text style={styles.text}>联系人（安全责任人）：{this.state.securityPerson}</Text>
        <Text style={styles.text}>手机号码：{this.state.securityTel}</Text>
        <Text style={styles.text}>申请人：{this.state.createBy}</Text>
        <Text style={styles.text}>联系电话：{this.state.operatorPhone}</Text>
        <Text style={styles.text}>校务部行政事务办主管：{this.state.schoolAdminUser}</Text>
        <Text style={styles.text}>校务部副部长：{this.state.schoolUser}</Text>
      </View>
    );
  }
}
