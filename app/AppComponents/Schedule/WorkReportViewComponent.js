import React, { Component } from 'react';
import HTMLView from 'react-native-htmlview';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import Styles from '../../CommonComponents/CommonStyles';
import Section from '../Section';
import { formatDateString } from '../../CommonComponents/FormatUtil';

export default class WorkReportViewComponent extends Component {
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
    const workType = this.translateWorkType();

    return (
      <ScrollView style={Styles.container}>
        <View>
          <Section>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>用户名称</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.userName}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>部门名称</Text>
              <Text style={Styles.sectionLineContentText}>{this.props.model.orgName}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>汇报类型</Text>
              <Text style={Styles.sectionLineContentText}>{workType}</Text>
            </View>
            <View style={Styles.sectionLine}>
              <Text style={Styles.sectionLineTitleText}>汇报期间</Text>
              <Text style={Styles.sectionLineContentText}>
                {formatDateString(this.props.model.beginDate)}
                --
                {formatDateString(this.props.model.endDate)}
              </Text>
            </View>
          </Section>
          <Section name="汇报内容">
            <View style={Styles.sectionLine}>
              <HTMLView style={Styles.htmlText} value={this.props.model.content} />
            </View>
          </Section>
        </View>
      </ScrollView>
    );
  }
}
