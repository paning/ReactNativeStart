import React, { Component } from 'react';
import {
  ListView,
  View,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import CommonComponents from '../CommonComponents/CommonComponents';
import ErrorPlaceholder from '../CommonComponents/ErrorPlacehoderComponent';
import KServices from '../NetworkService/KalixServices';

const styles = StyleSheet.create({
  appendLoading: {
    flex: 1,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loading: {
    height: 36,
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 20,
  },
  lightGrayText: {
    color: '#666',
  },
  buttonSmall: {
    borderRadius: 4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3385ff',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 9,
    paddingRight: 9,
    marginRight: 6,
  },
  buttonSmallText: {
    fontSize: 12,
    color: '#3385ff',
  },
  listTitle: {
    paddingLeft: 6,
    marginBottom: 10,
  },
  listGroup: {},
  listItem: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: -1,
    backgroundColor: '#fff',
  },
  itemContent: {
    flex: 1,
    paddingLeft: 10,
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 6,
  },
  itemDesc: {
    fontSize: 12,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  updatePressed: {
    backgroundColor: '#eee',
    borderColor: '#eee',
  },
});

const LISTVIEWREF = 'listview';

export default class SectionListView extends Component {
  static propTypes = {
    maxPage: React.PropTypes.number,
    reloadPromisePath: React.PropTypes.func,
    /**
     * render the row, like ListView
     */
    renderRow: React.PropTypes.func,
    /**
     * render the section, like ListView
     */
    renderSectionHeader: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.dataSource = [];
    this.totalCount = 0;
    this.page = 1;
    this.limit = 15;
    this.maxPage = -1;
    this.loading = false;
    this.loaded = false;
    this.loadPath = null;

    this.maxPage = this.props.maxPage || -1;
    this.loaded = false;

    const getSectionHeaderData = (dataBlob, sectionID) =>
        dataBlob[sectionID]
      ;

    const getRowData = (dataBlob, sectionID, rowID) =>
        dataBlob[sectionID].row[rowID]
      ;

    const dataSourceParam = {
      getSectionHeaderData,
      getRowData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
    };

    this.state = {
      dataSource: new ListView.DataSource(dataSourceParam),
      loaded: true,
      lastError: { isReloadError: false, error: null },
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadDataIfNeed() {
    const pathChanged = this.loadPath !== this.props.reloadPromisePath();
    if (this.dataSource.length === 0 || pathChanged) {
      this.reloadData();
    }
  }

  reloadData() {
    const that = this;
    const path = this.props.reloadPromisePath();
    this.loadPath = path;

    if (!path || this.loading) return;

    this.loading = true;
    this.setState({
      lastError: { isReloadError: false, error: null },
      loaded: this.state.dataSource.getRowCount() > 0,
    });
    this.dataSource = [];
    this.page = 1;

    const reloadPromise = KServices.fetchPromise(path);

    reloadPromise
      .then(value =>
        value.text(),
      )
      .then((responseText) => {
        if (responseText.indexOf('globle-custom.js') >= 0) {
          KServices.logout();
          return;
        }

        const json = JSON.parse(responseText);
        that.totalCount = json.totalCount;
        const rdata = json.data;
        const dataBlob = {};
        const sectionIDs = [];
        const rowIDs = [];

        for (let i = 0; i < 26; i++) {
          sectionIDs.push(i);
          rowIDs[i] = [];

          dataBlob[i] = {};
          dataBlob[i].section = String.fromCharCode(65 + i);
          dataBlob[i].row = {};
        }

        for (let i = 0; i < rdata.length; i++) {
          const index = rdata[i].phone.charCodeAt(0) - 97;
          const j = rowIDs[index].length;
          rowIDs[index].push(j);

          dataBlob[index].row[j] = rdata[i];
        }

        that.loading = false;
        that.setState({
          dataSource: that.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
          loaded: true,
        });
      })
      .catch((err) => {
        that.loading = false;
        that.setState({
          lastError: { isReloadError: true, error: err },
          loaded: true,
        });
      });
  }

  renderFooter() {
    const lastError = this.state.lastError;
    if (this.maxPage > this.page && !lastError.error) {
      return (
        <View style={styles.appendLoading}>
          <ActivityIndicator styleAttr="Small" />
        </View>
      );
    }

    return (
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Text>{this.totalCount}条记录</Text>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return CommonComponents.renderLoadingView();
    }

    if (this.state.lastError.isReloadError) {
      return (
        <ErrorPlaceholder
          title={this.state.lastError.error.message}
          desc={''}
          onPress={() => this.reloadData()}
        />
      );
    }

    if (Platform.OS === 'android') {
      return (
        <ListView
          style={styles.listGroup}
          dataSource={this.state.dataSource}
          enableEmptySections
          renderRow={this.props.renderRow}
          renderSectionHeader={this.props.renderSectionHeader}
          renderFooter={() => this.renderFooter()}
          scrollRenderAheadDistance={50}
        />
      );
    }

    return (
      <ListView
        ref={LISTVIEWREF}
        dataSource={this.state.dataSource}
        renderRow={this.props.renderRow}
        removeClippedSubviews
        renderFooter={this.renderFooter}
        automaticallyAdjustContentInsets={false}
        contentInset={{ top: 0, left: 0, bottom: 49, right: 0 }}
        contentOffset={{ x: 0, y: 0 }}
        scrollRenderAheadDistance={50}
        {...this.props}
      />
    );
  }
}
