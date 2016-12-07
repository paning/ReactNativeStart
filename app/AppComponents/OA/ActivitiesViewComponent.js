import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
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

export default class ActivitiesViewComponent extends Component {
  static propTypes = {
    historyProcessId: React.PropTypes.string,
  };

  static renderRow(rowData, sectionID, rowID) {
    return (
      <View id={rowID}>
        <View>
          <Text>节点名称：{rowData.activityName}</Text>
          <Text>执行人：{rowData.assignee}</Text>
          <Text>开始时间：{rowData.startTime}</Text>
          <Text>结束时间：{rowData.endTime}</Text>
          <Text>持续时长：{rowData.durationInMillis}</Text>
          <Text>审批结果：{rowData.result}</Text>
          <Text>审批意见：{rowData.comment}</Text>
        </View>
      </View>
    );
  }

  constructor(props) {
    super(props);

    this.dataSource = [];

    const dataSourceParam = {
      rowHasChanged: (row1, row2) => row1 !== row2,
    };

    this.state = {
      dataSource: new ListView.DataSource(dataSourceParam),
      loaded: true,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const that = this;
    const path = `${KServices.restPath()}/workflow/activities?historyProcessId=${this.props.historyProcessId}`;
    const promise = KServices.fetchPromise(path);
    promise
      .then(value => value.text())
      .then((responseText) => {
        const json = JSON.parse(responseText);
        const rdata = json.data;
        const ds = JSON.parse(JSON.stringify(rdata));

        that.dataSource.push(...ds);

        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(that.dataSource),
          loaded: true,
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
        <ListView
          dataSource={this.state.dataSource}
          renderRow={ActivitiesViewComponent.renderRow}
          removeClippedSubviews
          automaticallyAdjustContentInsets={false}
          contentInset={{ top: 0, left: 0, bottom: 49, right: 0 }}
          contentOffset={{ x: 0, y: 0 }}
          scrollRenderAheadDistance={50}
        />
      </View>
    );
  }
}
