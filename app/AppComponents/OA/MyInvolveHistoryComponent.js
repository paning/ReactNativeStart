import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  DrawerLayoutAndroid,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  DatePickerAndroid,
} from 'react-native';
import DrawerLayout from 'react-native-drawer-layout';

import KService from '../../NetworkService/KalixServices';
import MyProcessHistoryCell from './MyProcessHistoryCell';
import RefreshListView from '../RefreshListView';
import Colors from '../../CommonComponents/Colors';
import Styles from '../../CommonComponents/CommonStyles';
import ErrorPlaceholder from '../../CommonComponents/ErrorPlacehoderComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 2,
  },
  errorTextTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
  },
  reloadText: {
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 20,
    padding: 2,
  },
  logout: {
    marginTop: 40,
    height: 44,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 30,
    marginRight: 30,
  },

  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  drawerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerTitleContainer: {
    height: 120,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#3e9ce9',
  },
  drawerTitle: {
    fontSize: 20,
    textAlign: 'left',
    color: '#fcfcfc',
  },
  drawerSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  drawerSearchItemContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  drawerIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: 'center',
    color: 'black',
  },

  checkedBorder: {
    margin: 5,
    marginBottom: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 4,
    borderColor: Colors.blue,
  },
  uncheckedBorder: {
    margin: 5,
    marginBottom: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 4,
    borderColor: Colors.backGray,
  },
  nameAndPwd: {
    fontSize: 12,
    // fontWeight: 'bold',
    color: 'black',
    width: 40,
  },
});

export default class MyInvolveHistoryComponent extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    route: React.PropTypes.object,
  };

  static handleReloadData(responseText) {
    const jsonResult = JSON.parse(responseText);

    return jsonResult.data;
  }

  componentWillMount() {
    this.props.route.pressSearch = this.onPressSearch.bind(this);
  }

  onPressSearch() {
    this.drawer.openDrawer();
  }

  onPress(wt) {
    const workType = wt === this.state.workType ? -1 : wt;

    switch (workType) {
      case -1: {
        this.setState({
          workType: -1,
          workTypeName: '全部',
        });
      }
        break;
      case 0: {
        this.setState({
          workType: 0,
          workTypeName: '日报',
        });
      }
        break;
      case 1: {
        this.setState({
          workType: 1,
          workTypeName: '周报',
        });
      }
        break;
      case 2: {
        this.setState({
          workType: 2,
          workTypeName: '月报',
        });
      }
        break;
      default:
    }
  }

  reloadPath() {
    const jsonstr = {};

    const path = `${KService.restPath()}/workflow/myInvolvedHistory?jsonstr=${JSON.stringify(jsonstr)}`;
    return encodeURI(path);
  }

  // 进行创建时间日期选择器
  async showPicker(stateKey, options) {
    try {
      const newState = {};
      const { action, year, month, day } = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        // newState[stateKey + 'Text'] = 'dismissed';
      } else {
        const date = new Date(year, month, day);
        newState[`${stateKey}Text`] = `${year} -${month + 1}-${day}`;
        newState[`${stateKey}Date`] = date;
      }
      this.setState(newState);
    } catch ({ code, message }) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }

  drawerConfirm() {
    this.drawer.closeDrawer();
    this.listView.reloadData();
  }

  drawerCancel() {
    this.drawer.closeDrawer();
  }

  drawerReset() {
    this.setState({
      workType: -1,
      workTypeName: '全部',
      simpleText: '请选择',
      simpleDate: null,
    });
  }

  renderErrorPlaceholder(error) {
    const message = error.message;
    if (message.indexOf('Found') > -1) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTextTitle}>
            {error.message}
          </Text>
          <Text style={styles.errorText}>
            {'Oops, tap to reload'}
          </Text>
          <TouchableOpacity
            style={styles.reloadText}
            onPress={this.listView && this.listView.reloadData}
          >
            <Text style={styles.errorText}>
              Reload
            </Text>
          </TouchableOpacity>
          <Text style={[styles.errorTextTitle, { marginTop: 40 }]}>
            Or
          </Text>
          <TouchableOpacity
            style={styles.logout}
            onPress={() => GHService.logout()}
          >
            <Text style={styles.logoutText}>
              Try Another Account
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ErrorPlaceholder
        title={error.message}
        desc={'Oops, tap to reload'}
        onPress={this.listView && this.listView.reloadData}
      />
    );
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <MyProcessHistoryCell key={rowID} cell={rowData} navigator={this.props.navigator} />
    );
  }

  renderNavigationView() {
    return (
      <View style={[styles.drawerContainer, { backgroundColor: '#fcfcfc' }]}>
        <View style={styles.drawerTitleContainer} >
          <Text style={styles.drawerTitle}>
            筛选
          </Text>
        </View>
        <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableHighlight onPress={() => this.drawerConfirm()} underlayColor={Colors.backGray}>
            <Text>确认</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.drawerReset()} underlayColor={Colors.backGray}>
            <Text>重置</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.drawerCancel()} underlayColor={Colors.backGray}>
            <Text>取消</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    let marginTop = 100;
    if (Platform.OS === 'ios') {
      marginTop = 0;
    }

    const drawerWidth = (Dimensions.get('window').width / 5) * 3;
    return (
      <View style={Styles.container}>
        <DrawerLayout
          ref={(ref) => { this.drawer = ref; }}
          drawerWidth={drawerWidth}
          drawerPosition={Platform.OS === 'android' ? DrawerLayoutAndroid.positions.Right : 'right'}
          renderNavigationView={() => this.renderNavigationView()}
        >
          <RefreshListView
            ref={(ref) => { this.listView = ref; }}
            enablePullToRefresh
            renderRow={this.renderRow}
            reloadPromisePath={() => this.reloadPath()}
            handleReloadData={MyInvolveHistoryComponent.handleReloadData}
            navigator={this.props.navigator}
            contentInset={{ top: 64, left: 0, bottom: 49, right: 0 }}
            contentOffset={{ x: 0, y: -64 }}
            renderErrorPlaceholder={this.renderErrorPlaceholder}
          />
        </DrawerLayout>
      </View>
    );
  }
}
