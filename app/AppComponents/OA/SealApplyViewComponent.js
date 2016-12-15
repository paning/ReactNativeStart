import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import CommonComponents from '../../CommonComponents/CommonComponents';
import Style from '../../CommonComponents/CommonStyles';
import Section from '../Section';
import KServices from '../../NetworkService/KalixServices';

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
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>申请时间</Text>
            <Text style={Style.sectionLineContentText}>{this.state.creationDate}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>用印数</Text>
            <Text style={Style.sectionLineContentText}>{this.state.usageCount}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>印章类别</Text>
            <Text style={Style.sectionLineContentText}>{this.state.sealType}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>经办人</Text>
            <Text style={Style.sectionLineContentText}>{this.state.createBy}</Text>
          </View>
        </Section>
        <Section>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>部门负责人</Text>
            <Text style={Style.sectionLineContentText}>{this.state.departmentHead}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>分公司负责人</Text>
            <Text style={Style.sectionLineContentText}>{this.state.filialeHead}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>法律顾问</Text>
            <Text style={Style.sectionLineContentText}>{this.state.counsel}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>总经理</Text>
            <Text style={Style.sectionLineContentText}>{this.state.generalManager}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>印章专管员</Text>
            <Text style={Style.sectionLineContentText}>{this.state.sealAdministrator}</Text>
          </View>
        </Section>
        <Section>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>备注</Text>
            <Text style={Style.sectionLineContentText}>{this.state.remark}</Text>
          </View>
        </Section>
      </View>
    );
  }
}
