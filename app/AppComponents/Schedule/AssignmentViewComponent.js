import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import Styles from '../../CommonComponents/CommonStyles';
import Section from '../Section';

export default class AssignmentViewComponent extends Component {
  static propTypes = {
    model: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      loadingError: null,
      loading: false,
    };
  }

  translateWorkType() {
    switch (this.props.model.workType) {
      case 0:
        return '日报';
      case 1:
        return '周报';
      case 2:
        return '月报';
      default:
        return '未知';
    }
  }

  render() {
    return (
      <ScrollView style={Styles.container}>
        <View>
          <Section>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>任务名称</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.title}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>任务来源</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.sourceType}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>内容</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.content}</Text>
            </View>
          </Section>
          <Section>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>任务状态</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.state}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>开始日期</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.beginDate}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>结束日期</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.endDate}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>任务进度</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.percentNumber}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>进度说明</Text>
              <Text style={Styles.sectionLineContentText}>未设置</Text>
            </View>
          </Section>
          <Section>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>评估工时</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.workHours}小时</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>负责人</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.header}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>参与人</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.participant}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>奖罚标准</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.rewardStandard}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>领导批示</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.instruction}</Text>
            </View>
          </Section>
          <Section>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>评分</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.score}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>任务意见</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.advice}</Text>
            </View>
          </Section>
        </View>
      </ScrollView>
    );
  }
}
