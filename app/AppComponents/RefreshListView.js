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
import Section from './Section';
import ErrorPlaceholder from '../CommonComponents/ErrorPlacehoderComponent';
import KServices from '../NetworkService/KalixServices';


const LISTVIEWREF = 'listview';
const CONTAINERREF = 'container';

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
  listGroup: {
  },
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

export default class RefreshListView extends Component {
  static propTypes = {
    maxPage: React.PropTypes.number,
    reloadPromisePath: React.PropTypes.func,
    reloadPromise: React.PropTypes.func,
    /**
     * return an array of handled data, (value) => {}
     */
    handleReloadData: React.PropTypes.func,
    /**
     * return an append promise
     */
    appendPromise: React.PropTypes.func,
    /**
     * return an array of handled data, (value) => {}
     */
    handleAppendData: React.PropTypes.func,
    /**
     * return if need to load needPage
     */
    needNextPage: React.PropTypes.func,
    /**
     * render the row, like ListView
     */
    renderRow: React.PropTypes.func,
    /**
     * handle the load error ({isReloadError: false, error: null}) => {}
     */
    handleError: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.dataSource = [];
    this.totalCount = 0;
    this.page = 1;
    this.limit = 10;
    this.maxPage = -1;
    this.loading = false;
    this.loaded = false;
    this.loadPath = null;

    this.maxPage = this.props.maxPage || -1;
    this.loaded = false;

    const dataSourceParam = {
      rowHasChanged: (row1, row2) => row1 !== row2,
    };

    this.state = {
      dataSource: new ListView.DataSource(dataSourceParam),
      loaded: true,
      lastError: { isReloadError: false, error: null },
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  componentDidUpdate(prevProps, prevState) {
    const node = this.refs[LISTVIEWREF];
    if (!node || !this.props.enablePullToRefresh) return;
  }

  reloadDataIfNeed() {
    const pathChanged = this.loadPath !== this.props.reloadPromisePath();
    if (this.dataSource.length === 0 || pathChanged) {
      this.reloadData();
    }
  }

  computePage() {
    if (this.totalCount === 0) {
      this.maxPage = -1;
    }

    this.maxPage = Math.ceil(this.totalCount / this.limit);
  }

  clearData() {
    this.dataSource = [];
    this.setNeedsRenderList([]);
    this.page = 1;
    this.limit = 10;
    this.totalCount = 0;
    this.maxPage = 1;
    this.loading = false;
  }

  pageString(path) {
    const testReg = /\w+[?]\w+/;
    let paths = path;
    if (testReg.test(path)) {
      paths += `&page=${this.page}`;
    } else {
      paths += `?page=${this.page}`;
    }
    const start = (this.page - 1) * this.limit;
    paths += `&start=${start}&limit=${this.limit}`;
    return paths;
  }

  reloadData() {
    const that = this;
    let path = this.props.reloadPromisePath();
    this.loadPath = path;

    if (!path || this.loading) return;

    this.loading = true;
    this.setState({
      lastError: { isReloadError: false, error: null },
      loaded: this.state.dataSource.getRowCount() > 0,
      isRefreshing: true,
    });
    this.dataSource = [];
    this.page = 1;

    path = this.pageString(path);
    const reloadPromise = KServices.fetchPromise(path);
    reloadPromise
      .then((value) => {
        return value.text();
      })
      .then((responseText) => {
        const json = JSON.parse(responseText);
        that.totalCount = json.totalCount;
        that.computePage();
        const rdata = json.data;
        const ds = JSON.parse(JSON.stringify(rdata)); // clone datasorce, force renderRow update

        that.dataSource.push(...ds);

        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(that.dataSource),
          loaded: true,
        });
      })
      .catch((err) => {
        // const pError = {
        //   loaded: true,
        //   lastError: {isReloadError: true, error: err},
        // };
        // this.props.handleError && this.props.handleError(pError);
        // this.setState(pError);
        alert(err);
      })
      .done(() => {
        // const node = this.refs[LISTVIEWREF];
        // if (node && this.props.enablePullToRefresh) {
        //   // DXRefreshControl.endRefreshing(node);
        // }

        that.loading = false;
        that.setState({
          isRefreshing: false,
        });
      });
  }

  appendPage() {
    const that = this;

    if (this.page > this.maxPage) return;

    this.page = this.page + 1;

    let path = this.props.reloadPromisePath();
    if (!path) return;

    path = this.pageString(path);
    console.log('appendPage path', path);
    const appendPromise = KServices.fetchPromise(path);
    appendPromise
      .then(value =>
         value.text(),
      )
      .then((responseText) => {
        const t = JSON.parse(responseText);
        const rdata = t.data;
        const ds = JSON.parse(JSON.stringify(rdata)); // clone datasorce, force renderRow update

        that.dataSource.push(...ds);

        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(that.dataSource),
          loaded: true,
        });
      })
     .catch((err) => {
       alert(err);// that.showError(err);

       const pError = {
         loaded: true,
         lastError: { isReloadError: false, error: err },
       };
       that.setState(pError);
       that.page = that.page - 1;

       that.props.handleError && that.props.handleError(pError);
     });
  }

  setNeedsRenderList(rdata) {
    this.dataSource.push(...rdata);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.dataSource),
      loaded: true,
    });
  }

  render() {
    if (!this.state.loaded) {
      return CommonComponents.renderLoadingView();
    }

    if (this.state.lastError.isReloadError) {
      const error = this.state.lastError.error;
      if (this.props.renderErrorPlaceholder) {
        return this.props.renderErrorPlaceholder(error);
      }

      return (
        <ErrorPlaceholder
          title={error.message}
          desc={'Oops, tap to reload'}
          onPress={this.reloadData}
        />
      );
    }

    if (Platform.OS === 'android') {
      return (
          <ListView
            style={styles.listGroup}
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={this.props.renderRow.bind(this)}
            onEndReached={() => this.appendPage()}
            renderFooter={() => this.renderFooter()}
            scrollRenderAheadDistance={50}
          />
      );
    } else if (Platform.OS === 'ios') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }} ref={CONTAINERREF}>
          <ListView
            ref={LISTVIEWREF}
            dataSource={this.state.dataSource}
            renderRow={this.props.renderRow}
            removeClippedSubviews
            renderFooter={this.renderFooter}
            onEndReached={this.appendPage}
            automaticallyAdjustContentInsets={false}
            contentInset={{ top: 0, left: 0, bottom: 49, right: 0 }}
            contentOffset={{ x: 0, y: 0 }}
            scrollRenderAheadDistance={50}
            {...this.props}
          />
        </View>
      );
    }
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
}
