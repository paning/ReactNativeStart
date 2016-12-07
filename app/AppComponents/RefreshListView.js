import React, { Component } from 'react';
import {
  ListView,
  View,
  ActivityIndicatorIOS,
  Text,
  AppRegistry,
  Navigator,
  RefreshControl,
  Platform,
  ActivityIndicator,
  StyleSheet,

} from 'react-native';

import CommonComponents from '../CommonComponents/CommonComponents';
import KServices from '../NetworkService/KalixServices';
import ErrorPlaceholder from '../CommonComponents/ErrorPlacehoderComponent';

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
  constructor(props) {
    super(props);

    this._dataSource = [];
    this._page = 1;
    this._limit = 10;
    this._maxPage = -1;
    this._loading = false;
    this._loaded = false;
    this._loadPath = null;

    this._maxPage = this.props.maxPage || -1;
    this._loaded = false;

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

  reloadDataIfNeed() {
    const pathChanged = this._loadPath != this.props.reloadPromisePath();
    if (this._dataSource.length == 0 || pathChanged) {
      this.reloadData();
    }
  }

  clearData() {
    this._dataSource = [];
    this._setNeedsRenderList([]);
    this._page = 1;
    this._limit = 10;
    this._maxPage = 1;
    this._loading = false;
  }

  _pageString(path) {
    const testReg = /\w+[?]\w+/;
    if (testReg.test(path)) {
      path += `&page=${this._page}`;
    } else {
      path += `?page=${this._page}`;
    }
    const start = (this._page - 1) * this._limit;
    path += `&start=${start}&limit=${this._limit}`;
    return path;
  }

  reloadData() {
    const that = this;
    let path = this.props.reloadPromisePath();
    this._loadPath = path;

    if (!path || this._loading) return;

    this._loading = true;
    this.setState({
      lastError: { isReloadError: false, error: null },
      loaded: this.state.dataSource.getRowCount() > 0,
      isRefreshing: true,
    });
    this._dataSource = [];
    this._page = 1;

    path = this._pageString(path);
    const reloadPromise = KServices.fetchPromise(path);
    reloadPromise
      .then((value) => {
        // look for the last page
        if (this._maxPage == -1) {
          const links = value.headers.map.link && value.headers.map.link[0];
          if (links) {
            const reg = /page=(\d+)\S+\s+rel="last"/g;
            const matchs = reg.exec(links);
            const end = matchs[1];
            if (end) {
              this._maxPage = end;
            }
          }
        }

        if (value.status > 400) {
          const body = JSON.parse(value._bodyInit);
          const needLogin = body.message.indexOf('rate') != -1;
          if (needLogin) {
            this.props.navigator.push({
              id: 'login',
              title: 'API rate need login',
              sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            });
          }
        }

        return value.text();
      })
      .then((responseText) => {
        const t = JSON.parse(responseText)
        const rdata = t.data;
        // this._setNeedsRenderList(rdata);
        const _ds = JSON.parse(JSON.stringify(rdata)); // clone datasorce, force renderRow update

        that._dataSource.push(..._ds);

        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(this._dataSource),
          loaded: true,
        });

        if (that._dataSource.length == 0) {
          throw new Error('Not Found');
        }
      })
      .catch((err) => {
        // const pError = {
        //   loaded: true,
        //   lastError: {isReloadError: true, error: err},
        // };
        // this.props.handleError && this.props.handleError(pError);
        // this.setState(pError);
      })
      .done(() => {
        const node = this.refs[LISTVIEWREF];
        if (node && this.props.enablePullToRefresh) {
          // DXRefreshControl.endRefreshing(node);
        }

        this._loading = false;
        this.setState({
          isRefreshing: false,
        });
      });
  }

  appendPage() {
    const that = this;

    if (this._page > this._maxPage) return;

    this._page ++;

    let path = this.props.reloadPromisePath();
    if (!path) return;

    path = this._pageString(path);
    console.log('appendPage path', path);
    const appendPromise = KServices.fetchPromise(path);
    appendPromise
      .then(value =>
         value.text(),
      )
      .then((responseText) => {
        const t = JSON.parse(responseText)
        const rdata = t.data;
        // const rdata = WorkReportComponent.handleReloadData(responseText);
       // that._setNeedsRenderList(rdata);

        const _ds = JSON.parse(JSON.stringify(rdata)); // clone datasorce, force renderRow update

        that._dataSource.push(..._ds);

        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(this._dataSource),
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
       that._page --;

       that.props.handleError && that.props.handleError(pError);
     });
  }

  _setNeedsRenderList(rdata) {
    this._dataSource.push(...rdata);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._dataSource),
      loaded: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const node = this.refs[LISTVIEWREF];
    if (!node || !this.props.enablePullToRefresh) return;

    // DXRefreshControl.configureCustom(node, {
    //   headerViewClass: 'UIRefreshControl',
    // }, this.reloadData);
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View style={styles.listItem} id={rowID}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{rowData.title}</Text>
          <Text style={styles.itemDesc}>更新时间：{rowData.desc}</Text>
        </View>
        <TouchableHighlight style={[styles.buttonSmall]} onPress={() => this.onItemPress(rowData)} underlayColor="#06f">
          <Text style={[styles.buttonSmallText]}>更新</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return CommonComponents.renderLoadingView();
    }

    if (this.state.lastError.isReloadError) {
      const error = this.state.lastError.error;
      if (this.props.renderErrorPlaceholder) {
        return this.props.renderErrorPlaceholder(error);
      } else {
        return (
          <ErrorPlaceholder
            title={error.message}
            desc={'Oops, tap to reload'}
            onPress={this.reloadData}
          />
        );
      }
    }

    if (Platform.OS === 'android') {
      return (
          // <ListView
          //   dataSource={this.state.dataSource}
          //   renderRow={this.props.renderRow.bind(this)}
          //   removeClippedSubviews={true}
          //   renderFooter={this.renderFooter.bind(this)}
          //   onEndReached={this.appendPage.bind(this)}
          //   scrollRenderAheadDistance={50}
          //   {...this.props}
          //   style={[{flex: 1}, this.props.style]}
          //   refreshControl={
          //     <RefreshControl
          //       refreshing={this.state.isRefreshing}
          //       onRefresh={this.reloadData.bind(this)}
          //       tintColor="#ff0000"
          //       title="Loading..."
          //       titleColor="#00ff00"
          //       colors={['#ff0000', '#00ff00', '#0000ff']}
          //       progressBackgroundColor="#ffff00"
          //     />
          //   }
          //   >
          // </ListView>

        <View style={styles.container}>
          <Text style={styles.title}>aHostsApp</Text>
          <View style={styles.separator} />
          <ListView
            style={styles.listGroup}
            dataSource={this.state.dataSource}
            renderRow={this.props.renderRow.bind(this)}
            onEndReached={this.appendPage.bind(this)}
          />
        </View>
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
    if (this._maxPage > this._page && !lastError.error) {
      return (
        <View style={styles.appendLoading}>
          <ActivityIndicator styleAttr="Small" />
        </View>
      );
    }
  }
}
