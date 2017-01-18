import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../CommonComponents/Colors';
import Styles from '../../CommonComponents/CommonStyles';
import { formatDateString } from '../../CommonComponents/FormatUtil';
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

  translateSourceType() {
    switch (this.props.model.sourceType) {
      case 0:
        return '部门计划';
      case 1:
        return '母任务';
      default:
        return '自定义';
    }
  }

  translateState() {
    switch (this.props.model.state) {
      case 0:
        return '等待接收';
      case 1:
        return '拒绝接收';
      case 2:
        return '进行中';
      case 3:
        return '提交审核';
      case 4:
        return '任务完成';
      case 5:
        return '任务已失败';
      case 6:
        return '任务已撤销';
      default:
        return '未知';
    }
  }

  SourceTypePress() {
    switch (this.props.model.sourceType) {
      case 0:
        return '部门计划';
      case 1:
        return '母任务';
      default:
        return '自定义';
    }
  }

  render() {
    return (
      <ScrollView style={Styles.container}>
        <View>
          <Section>
            <View style={Styles.sectionLineView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>任务名称</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {this.props.model.title}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLineView}>
              <TouchableOpacity style={Styles.sectionLine} onPress={() => this.SourceTypePress()}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>任务来源</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {this.translateSourceType()}
                    </Text>
                  </View>
                  <View style={{ width: 24, paddingLeft: 10 }}>
                    <Icon
                      name={'angle-right'}
                      size={24}
                      color={Colors.sectionLineIconColor}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={Styles.sectionLineLastView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>任务内容</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {this.props.model.content}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Section>
          <Section>
            <View style={Styles.sectionLineView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>任务状态</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {this.translateState()}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLineView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>开始日期</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {formatDateString(this.props.model.beginDate, 'yyyy-MM-dd')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLineView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>结束日期</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {formatDateString(this.props.model.endDate, 'yyyy-MM-dd')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLineView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>任务进度</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {this.props.model.percentNumber} %
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLineLastView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>进度说明</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      未设置
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Section>
          <Section>
            <View style={Styles.sectionLineView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>评估工时</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {this.props.model.workHours}小时
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLineView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>负责人</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {this.props.model.header}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLineView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>参与人</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {this.props.model.participant}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLineView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>奖罚标准</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {this.props.model.rewardStandard}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLineLastView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>领导批示</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {this.props.model.instruction}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Section>
          <Section>
            <View style={Styles.sectionLineView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>评分</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {this.props.model.score}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={Styles.sectionLineLastView}>
              <View style={Styles.sectionLine}>
                <View style={Styles.sectionLineLeftView}>
                  <Text style={Styles.sectionLineTitleText}>任务意见</Text>
                </View>
                <View style={Styles.sectionLineRightView}>
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={Styles.sectionLineContentText}>
                      {this.props.model.advice}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Section>
        </View>
      </ScrollView>
    );
  }
}
