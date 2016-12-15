import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
} from 'react-native';

import Section from '../Section';
import CommonComponents from '../../CommonComponents/CommonComponents';
import Style from '../../CommonComponents/CommonStyles';
import KServices from '../../NetworkService/KalixServices';

export default class ActivitiesViewComponent extends Component {
  static propTypes = {
    historyProcessId: React.PropTypes.string,
  };

  static renderRow(rowData, sectionID, rowID) {
    return (
      <View style={Style.rowContentView}>
        <View style={Style.rowContent} >
          <View style={Style.rowLineBetween} >
            <Text style={Style.rowLineTitle}>
              {rowData.activityName}
            </Text>
            <Text style={Style.rowLineTitle}>
              {rowData.result}
            </Text>
          </View>
          <View style={Style.rowLineBetween} >
            <Text style={Style.rowLineContent} >
              {rowData.assignee}
            </Text>
            <Text style={Style.rowLineContent} >
              {rowData.startTime}
            </Text>
          </View>
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
      <Section name="流程历史">
        <ListView
          dataSource={this.state.dataSource}
          renderRow={ActivitiesViewComponent.renderRow}
          removeClippedSubviews
          automaticallyAdjustContentInsets={false}
          contentInset={{ top: 0, left: 0, bottom: 49, right: 0 }}
          contentOffset={{ x: 0, y: 0 }}
          scrollRenderAheadDistance={50}
        />
      </Section>
    );
  }
}
