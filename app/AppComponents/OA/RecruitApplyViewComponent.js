import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import CommonComponents from '../../CommonComponents/CommonComponents';
import Style from '../../CommonComponents/CommonStyles';
import Section from '../Section';
import KServices from '../../NetworkService/KalixServices';

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
            <Text style={Style.sectionLineTitleText}>申请人</Text>
            <Text style={Style.sectionLineContentText}>{this.state.createBy}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>申请事由</Text>
            <Text style={Style.sectionLineContentText}>{this.state.reason}</Text>
          </View>
        </Section>
        <Section>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>拟聘人数</Text>
            <Text style={Style.sectionLineContentText}>{this.state.recruitCount}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>定编人数</Text>
            <Text style={Style.sectionLineContentText}>{this.state.allocationCount}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>现有人数</Text>
            <Text style={Style.sectionLineContentText}>{this.state.existCount}</Text>
          </View>
        </Section>
        <Section>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>核心职责</Text>
            <Text style={Style.sectionLineContentText}>{this.state.coreRecruit}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>常规职责</Text>
            <Text style={Style.sectionLineContentText}>{this.state.commonRecruit}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>待遇标准</Text>
            <Text style={Style.sectionLineContentText}>{this.state.treatmentLevel}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>建议招聘方式</Text>
            <Text style={Style.sectionLineContentText}>{this.state.recruitType}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>任职基本条件</Text>
            <Text style={Style.sectionLineContentText}>{this.state.baseCondition}</Text>
          </View>
        </Section>
        <Section>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>部门负责人</Text>
            <Text style={Style.sectionLineContentText}>{this.state.depUser}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>人力资源处长</Text>
            <Text style={Style.sectionLineContentText}>{this.state.manpower}</Text>
          </View>
        </Section>
      </View>
    );
  }
}
