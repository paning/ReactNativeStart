import React, { Component } from 'react';
import HTMLView from 'react-native-htmlview';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { formatDateString } from '../CommonComponents/FormatUtil';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },

  text: {
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EDECF1',
  },
});

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
    let workTypeName;
    switch (this.props.model.workType) {
      case 0: {
        workTypeName = '日报';
      }
        break;
      case 1: {
        workTypeName = '周报';
      }
        break;
      case 2: {
        workTypeName = '月报';
      }
        break;
      default: {
        workTypeName = '未知';
      }
        break;
    }
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.container}>
          <Text style={styles.text}>用户名称：{this.props.model.userName}</Text>
          <Text style={styles.text}>部门名称：{this.props.model.orgName}</Text>
          <Text style={styles.text}>汇报类型：{workTypeName}</Text>
          <Text style={styles.text}>
            汇报期间：{formatDateString(this.props.model.beginDate)}
            --
            {formatDateString(this.props.model.endDate)}
          </Text>
          <HTMLView style={styles.text} value={this.props.model.content} />
        </View>
      </ScrollView>
    );
  }
}
