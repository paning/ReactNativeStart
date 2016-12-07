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

export default class SealApplyViewComponent extends Component {
  static propTypes = {
    entityId: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      title: '',              // 名称
      orgName: '',            // 申请部门
      creationDate: '',       // 申请时间
      usageCount: 0,          // 用印数
      sealType: 0,            // 印章类别
      createBy: '',           // 经办人
      currentNode: '',        // 当前节点
      status: '',             // 状态
      auditResult: '',        // 审批状态
      departmentHead: '',     // 部门负责人
      filialeHead: '',        // 分公司负责人
      counsel: '',            // 法律顾问
      generalManager: '',     // 总经理
      sealAdministrator: '',  // 印章专管员
      remark: '',             // 备注
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const that = this;
    const path = `${KServices.restPath()}/sealapplys/${this.props.entityId}`;
    const promise = KServices.fetchPromise(path);
    promise
      .then(value => value.text())
      .then((responseText) => {
        const model = JSON.parse(responseText);

        that.setState({
          title: model.title,
          orgName: model.orgName,
          creationDate: model.creationDate,
          usageCount: model.usageCount,
          sealType: model.sealType,
          createBy: model.createBy,
          currentNode: model.currentNode,
          status: model.status,
          auditResult: model.auditResult,
          departmentHead: model.departmentHead,
          filialeHead: model.filialeHead,
          counsel: model.counsel,
          generalManager: model.generalManager,
          sealAdministrator: model.sealAdministrator,
          remark: model.remark,
        });
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
        <Text style={styles.text}>申请时间：{this.state.creationDate}</Text>
        <Text style={styles.text}>用印数：{this.state.usageCount}</Text>
        <Text style={styles.text}>印章类别：{this.state.sealType}</Text>
        <Text style={styles.text}>经办人：{this.state.createBy}</Text>
        <Text style={styles.text}>当前节点：{this.state.currentNode}</Text>
        <Text style={styles.text}>状态：{this.state.status}</Text>
        <Text style={styles.text}>审批状态：{this.state.auditResult}</Text>
        <Text style={styles.text}>部门负责人：{this.state.departmentHead}</Text>
        <Text style={styles.text}>分公司负责人：{this.state.filialeHead}</Text>
        <Text style={styles.text}>法律顾问：{this.state.counsel}</Text>
        <Text style={styles.text}>总经理：{this.state.generalManager}</Text>
        <Text style={styles.text}>印章专管员：{this.state.sealAdministrator}</Text>
        <Text style={styles.text}>备注：{this.state.remark}</Text>
      </View>
    );
  }
}
