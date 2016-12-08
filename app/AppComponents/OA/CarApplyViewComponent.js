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

export default class CarApplyViewComponent extends Component {
  static propTypes = {
    entityId: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      title: '',              // 名称
      orgName: '',            // 申请部门
      applyDate: '',          // 申请时间
      reason: '',             // 用车事由
      usageCount: 0,          // 乘车人数
      beginDate: '',          // 用车时段
      endDate: '',            // 用车时段
      address: '',            // 用车起始地点
      city: true,             // 室内用车
      createBy: '',           // 申请人
      operatorPhone: '',      // 联系电话
      currentNode: '',        // 当前节点
      status: 1,              // 状态
      auditResult: '',        // 审批状态
      depUser: '',            // 部门负责人
      managerUser: '',        // 副校级领导
      schoolUser: '',         // 校务部
      schoolManagerUser: '',  // 主管领导(市外)
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const that = this;
    const path = `${KServices.restPath()}/carapplys/${this.props.entityId}`;
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
        <Text style={styles.text}>申请时间：{this.state.applyDate}</Text>
        <Text style={styles.text}>用车事由：{this.state.reason}</Text>
        <Text style={styles.text}>乘车人数：{this.state.usageCount}</Text>
        <Text style={styles.text}>用车时段：{this.state.beginDate} -- {this.state.endDate}</Text>
        <Text style={styles.text}>用车起始地点：{this.state.address}</Text>
        <Text style={styles.text}>室内用车：{this.state.city ? '是' : '否'}</Text>
        <Text style={styles.text}>申请人：{this.state.createBy}</Text>
        <Text style={styles.text}>联系电话：{this.state.operatorPhone}</Text>
        <Text style={styles.text}>部门负责人：{this.state.depUser}</Text>
        <Text style={styles.text}>副校级领导：{this.state.managerUser}</Text>
        <Text style={styles.text}>校务部：{this.state.schoolUser}</Text>
        <Text style={styles.text}>主管领导(市外)：{this.state.schoolManagerUser}</Text>
      </View>
    );
  }
}
