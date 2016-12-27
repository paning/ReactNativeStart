import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  DrawerLayoutAndroid,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  DatePickerAndroid,
  ScrollView,
} from 'react-native';
import DrawerLayout from 'react-native-drawer-layout';

import Global from '../../CommonComponents/Globle';
import Section from '../Section';
import KService from '../../NetworkService/KalixServices';
import AssignmentCell from './AssignmentCell';
import RefreshListView from '../RefreshListView';
import Colors from '../../CommonComponents/Colors';
import Styles from '../../CommonComponents/CommonStyles';
import ErrorPlaceholder from '../../CommonComponents/ErrorPlacehoderComponent';
import { formatDate } from '../../CommonComponents/FormatUtil';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 60,
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

  nameAndPwd: {
    fontSize: 12,
    // fontWeight: 'bold',
    color: 'black',
    width: 40,
  },
});

export default class AssignmentComponent extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    route: React.PropTypes.object,
  };

  static handleReloadData(responseText) {
    const jsonResult = JSON.parse(responseText);

    return jsonResult.data;
  }

  constructor(props) {
    super(props);

    this.state = {
      workType: -1,
      workTypeName: '全部',
      simpleText: '请选择',
      simpleDate: null,
    };
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

    const path = `${KService.restPath()}/assignments?jsonstr=${JSON.stringify(jsonstr)}`;
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
      <AssignmentCell key={rowID} cell={rowData} navigator={this.props.navigator} />
    );
  }

  renderNavigationView() {
    return (
      <View style={Styles.containerNoMargin}>
        <ScrollView>
          <Section>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ padding: 10 }}>汇报类型</Text>
              <Text style={{ padding: 10 }}>{this.state.workTypeName}</Text>
            </View>

            <View style={Styles.searchSingleSelectView}>
              <TouchableHighlight
                style={this.state.workType === 0 ? Styles.searchSingleSelectChecked : Styles.searchSingleSelectUnChecked}
                onPress={() => this.onPress(0)}
                underlayColor={Colors.backGray}
              >
                <Text style={Styles.searchSingleSelectText}>
                  日报
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={this.state.workType === 1 ? Styles.searchSingleSelectChecked : Styles.searchSingleSelectUnChecked}
                onPress={() => this.onPress(1)}
                underlayColor={Colors.backGray}
              >
                <Text style={Styles.searchSingleSelectText}>
                  周报
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={this.state.workType === 2 ? Styles.searchSingleSelectChecked : Styles.searchSingleSelectUnChecked}
                onPress={() => this.onPress(2)}
                underlayColor={Colors.backGray}
              >
                <Text style={Styles.searchSingleSelectText}>
                  月报
                </Text>
              </TouchableHighlight>
            </View>
          </Section>
          <Section>
            <View style={styles.drawerSearchItemContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableHighlight
                  onPress={() => this.showPicker('simple', { date: this.state.simpleDate == null ? new Date() : this.state.simpleDate })}
                  underlayColor={Colors.backGray}
                >
                  <Text style={{ padding: 10 }}>日期</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => this.showPicker('simple', { date: this.state.simpleDate == null ? new Date() : this.state.simpleDate })}
                  underlayColor={Colors.backGray}
                >
                  <Text style={{ padding: 10 }}>{this.state.simpleText}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Section>


        </ScrollView>
        <View style={Styles.searchButtonView}>
          <TouchableHighlight
            style={{ flex: 1, alignItems: 'stretch' }}
            onPress={() => this.drawerReset()}
            underlayColor={Colors.backGray}
          >
            <Text style={Styles.searchResetButton}>重置</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ flex: 1, alignItems: 'stretch' }}
            onPress={() => this.drawerConfirm()}
            underlayColor={Colors.backGray}
          >
            <Text style={Styles.searchConfirmButton}>确认</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    let marginTop = 44;
    if (Platform.OS === 'ios') {
      marginTop = 0;
    }

    return (
      <View style={Styles.container}>
        <DrawerLayout
          ref={(ref) => { this.drawer = ref; }}
          drawerWidth={Global.drawerWidth}
          drawerPosition={Platform.OS === 'android' ? DrawerLayoutAndroid.positions.Right : 'right'}
          renderNavigationView={() => this.renderNavigationView()}
        >
          <RefreshListView
            ref={(ref) => { this.listView = ref; }}
            style={{ flex: 1, marginTop }}
            enablePullToRefresh
            renderRow={this.renderRow}
            reloadPromisePath={() => this.reloadPath()}
            handleReloadData={AssignmentComponent.handleReloadData}
            navigator={this.props.navigator}
            maxPage={5}
            contentInset={{ top: 64, left: 0, bottom: 49, right: 0 }}
            contentOffset={{ x: 0, y: -64 }}
            renderErrorPlaceholder={this.renderErrorPlaceholder}
          />
        </DrawerLayout>
      </View>
    );
  }
}
