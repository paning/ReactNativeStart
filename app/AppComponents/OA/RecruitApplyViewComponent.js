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

export default class RecruitApplyViewComponent extends Component {
  static propTypes = {
    entityId: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      title: '',              // 名称
      orgName: '',            // 申请部门
      reason: 0,              // 申请事由
      recruitCount: 0,        // 拟聘人数
      allocationCount: 0,     // 定编人数
      existCount: 0,          // 现有人数
      coreRecruit: '',        // 核心职责
      commonRecruit: '',      // 常规职责
      treatmentLevel: '',     // 待遇标准
      baseCondition: '',      // 任职基本条件
      recruitType: 0,         // 建议招聘方式
      createBy: '',           // 申请人
      currentNode: '',        // 当前节点
      status: 1,              // 状态
      auditResult: '',        // 审批状态
      depUser: '',            // 部门负责人
      manpower: '',           // 人力资源处长
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const that = this;
    const path = `${KServices.restPath()}/recruitapplys/${this.props.entityId}`;
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
        <Text style={styles.text}>申请事由：{this.state.reason}</Text>
        <Text style={styles.text}>拟聘人数：{this.state.recruitCount}</Text>
        <Text style={styles.text}>定编人数：{this.state.allocationCount}</Text>
        <Text style={styles.text}>现有人数：{this.state.existCount}</Text>
        <Text style={styles.text}>核心职责：{this.state.coreRecruit}</Text>
        <Text style={styles.text}>常规职责：{this.state.commonRecruit}</Text>
        <Text style={styles.text}>待遇标准：{this.state.treatmentLevel}</Text>
        <Text style={styles.text}>任职基本条件：{this.state.baseCondition}</Text>
        <Text style={styles.text}>建议招聘方式：{this.state.recruitType}</Text>
        <Text style={styles.text}>申请人：{this.state.createBy}</Text>
        <Text style={styles.text}>部门负责人：{this.state.depUser}</Text>
        <Text style={styles.text}>人力资源处长：{this.state.manpower}</Text>
      </View>
    );
  }
}
