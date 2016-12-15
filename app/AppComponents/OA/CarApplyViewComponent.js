import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import CommonComponents from '../../CommonComponents/CommonComponents';
import Style from '../../CommonComponents/CommonStyles';
import Section from '../Section';
import KServices from '../../NetworkService/KalixServices';

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
            <Text style={Style.sectionLineTitleText}>联系电话</Text>
            <Text style={Style.sectionLineContentText}>{this.state.operatorPhone}</Text>
          </View>
        </Section>
        <Section>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>申请时间</Text>
            <Text style={Style.sectionLineContentText}>{this.state.applyDate}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>用车事由</Text>
            <Text style={Style.sectionLineContentText}>{this.state.reason}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>乘车人数</Text>
            <Text style={Style.sectionLineContentText}>{this.state.usageCount}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>用车时段</Text>
            <Text style={Style.sectionLineContentText}>
              {this.state.beginDate} -- {this.state.endDate}
            </Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>用车起始地点</Text>
            <Text style={Style.sectionLineContentText}>{this.state.address}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>室内用车</Text>
            <Text style={Style.sectionLineContentText}>{this.state.city ? '是' : '否'}</Text>
          </View>
        </Section>
        <Section>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>部门负责人</Text>
            <Text style={Style.sectionLineContentText}>{this.state.depUser}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>副校级领导</Text>
            <Text style={Style.sectionLineContentText}>{this.state.managerUser}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>校务部</Text>
            <Text style={Style.sectionLineContentText}>{this.state.schoolUser}</Text>
          </View>
          <View style={Style.sectionLine}>
            <Text style={Style.sectionLineTitleText}>主管领导(市外)</Text>
            <Text style={Style.sectionLineContentText}>{this.state.schoolManagerUser}</Text>
          </View>
        </Section>
      </View>
    );
  }
}
