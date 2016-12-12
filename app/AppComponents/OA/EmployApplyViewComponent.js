import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
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
      <View style={styles.container}>
        <Text style={styles.text}>名称：{this.state.title}</Text>
        <Text style={styles.text}>申请部门：{this.state.orgName}</Text>
        <TouchableOpacity onPress={() => this.personInfoOnPress()} style={styles.buttonView}>
          <Text style={styles.buttonText}>人员基本信息</Text>
        </TouchableOpacity>
        <Text style={styles.text}>分院领导审批：{this.state.branchSchoolLeader}</Text>
        <Text style={styles.text}>校领导审批：{this.state.schoolLeader}</Text>
        <Text style={styles.text}>人力资源部长签字：{this.state.manpower}</Text>
      </View>
    );
  }
}
