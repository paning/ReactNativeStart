import React from 'react';
import {
  Navigator,
  TouchableOpacity,
  StyleSheet,
  PixelRatio,
  Text,
  BackAndroid,
  Dimensions,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import TestListView from './TestListView';

import OA from './OA/main';
import TaskComponent from './OA/TaskComponent';
import TaskView from './OA/TaskView';
import MyProcessHistoryComponent from './OA/MyProcessHistoryComponent';
import MyInvolveHistoryComponent from './OA/MyInvolveHistoryComponent';
import MyProcessHistoryView from './OA/MyProcessHistoryView';
// import CarApplyComponent from './OA/CarApplyComponent';
// import RecruitApplyComponent from './OA/RecruitApplyComponent';
// import EmployApplyComponent from './OA/EmployApplyComponent';
// import MeetingApplyComponent from './OA/MeetingApplyComponent';
// import SealApplyComponent from './OA/SealApplyComponent';
// import MainWorkComponent from './OA/MainWorkComponent';
//

import Schedule from './Schedule/main';
import WorkReportComponent from './Schedule/WorkReportComponent';
import WorkReportViewComponent from './Schedule/WorkReportViewComponent';
import AssignmentComponent from './Schedule/AssignmentComponent';
import AssignmentViewComponent from './Schedule/AssignmentViewComponent';

import Setting from './SettingComponent';
import Colors from '../CommonComponents/Colors';
import LoginComponent from './LoginComponent';
import NavigatorNavigationBarStyle from './GHNavigatorBarStyle.android';

const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: '#625c38',
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 0.5,
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    // color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 11,
    color: 'white',
  },
  navBarLeftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    height: 40,
    width: 100,
  },
  navBarRightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    height: 40,
  },
  navBarButtonText: {
    // color: cssVar('fbui-accent-blue'),
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
  searchBar: {
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 10,
    height: 35,
    // borderWidth: 1,
    // borderColor: Colors.borderColor,
    borderRadius: 4,
    margin: 5,
    backgroundColor: Colors.backGray,
  },
  searchIcon: {
    marginLeft: 3,
    marginRight: 3,
    width: 20,
    height: 20,
  },
  textInput: {
    fontSize: 14,
    alignSelf: 'stretch',
    flex: 1,
    color: Colors.black,
  },
});

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index === 0 || route.id === 'login') {
      return null;
    } else if (route.id === 'editprofile') {
      return (
        <TouchableOpacity onPress={route.pressCancel}>
          <Text style={[styles.navBarText, { marginRight: 10, marginLeft: 10 }]}>
            Cancel
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}
      >
        <Icon
          name="ios-arrow-back"
          size={40}
          color={Colors.backWhite}
        />
      </TouchableOpacity>
    );
  },

  RightButton(route, navigator, index, navState) {
    let rightButton;
    switch (route.id) {
      case 'login': {
        rightButton = (
          <TouchableOpacity onPress={() => navigator.pop()}>
            <Text style={[styles.navBarText, { marginRight: 10 }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        );
      }
        break;
      case 'workreport':
        rightButton = (
          <TouchableOpacity
            style={styles.navBarRightButton}
            onPress={route.pressSearch}
          >
            <Icon
              name={'ios-search'}
              size={30}
              color={Colors.backWhite}
            />
          </TouchableOpacity>

        );
        break;
      case 'web':
        if (Platform.OS === 'ios') {
          rightButton = (
            <TouchableOpacity
              onPress={route.onShare}
              style={{ width: 40, height: 40 }}
            >
              <Icon
                name="share"
                size={30}
                style={{ paddingLeft: 10, marginTop: 8 }}
                color={Colors.blue}
              />
            </TouchableOpacity>
          );
        }
        break;
      default:
    }

    return rightButton;
  },

  Title(route, navigator, index, navState) {
    let title;
    switch (route.id) {
      case 'oa':
        title = '办公自动化';
        break;
      case 'mainwork':
        title = '流程申请';
        break;
      case 'recruitapply':
        title = '用工申请';
        break;
      case 'employapply':
        title = '入职申请';
        break;
      case 'meetingapply':
        title = '会议室申请';
        break;
      case 'sealapply':
        title = '印章使用申请';
        break;
      case 'carapply':
        title = '公务用车申请';
        break;
      case 'task':
        title = '待办流程';
        break;
      case 'taskView':
        title = route.model.businessNo;
        break;
      case 'myprocesshistory':
        title = '我的流程';
        break;
      case 'myinvolvehistory':
        title = '我参与的流程';
        break;
      case 'myProcessHistoryView':
        title = route.model.name;
        break;
      case 'schedule':
        title = '计划任务';
        break;
      case 'workreport':
        title = '工作汇报';
        break;
      case 'workreportView':
        title = route.obj.title;
        break;
      case 'assignment':
        title = '任务管理';
        break;
      case 'assignmentView':
        title = route.obj.title;
        break;
      case 'setting':
        title = '设置';
        break;
      case 'login':
        title = route.title;
        break;
      default:
    }

    return (
      <Text
        style={[styles.navBarText,
          styles.navBarTitleText,
                    { width: 250, height: 40, textAlign: 'center' }]}
        numberOfLines={1}
      >
        {title}
      </Text>
    );
  },
};

const routes = {
  navigator(initialRoute) {
    return (
      <Navigator
        initialRoute={{ id: initialRoute }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
            navigationStyles={NavigatorNavigationBarStyle}
          />
				}
        tabLabel={this.tabObjForRoute(initialRoute)}
      />
    );
  },

  tabObjForRoute(routeName) {
    let tab = { tabName: 'Feed', iconName: 'ios-home' };
    switch (routeName) {
      case 'test':
        tab = { tabName: '工作计划', iconName: 'ios-home' };
        break;
      case 'oa':
        tab = { tabName: '办公', iconName: 'ios-flame' };
        break;
      case 'schedule':
        tab = { tabName: '计划任务', iconName: 'ios-home' };
        break;
      case 'setting':
        tab = { tabName: '设置', iconName: 'ios-person' };
        break;
      default:
    }

    return tab;
  },

  renderScene(route, navigator) {
    // DXRNUtils.trackClick('渲染现实的页面' + route.id);
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
      }
      return false;
    });

    switch (route.id) {
      case 'test':
        return <TestListView navigator={navigator} route={route} />;
      case 'oa':
        return <OA navigator={navigator} route={route} style={{ flex: 1 }} />;
      case 'task':
        return <TaskComponent navigator={navigator} route={route} style={{ flex: 1 }} />;
      case 'taskView':
        return <TaskView navigator={navigator} model={route.model} style={{ flex: 1 }} />;
      case 'myprocesshistory':
        return (
          <MyProcessHistoryComponent
            navigator={navigator}
            route={route}
            style={{ flex: 1 }}
          />
        );
      case 'myProcessHistoryView':
        return (
          <MyProcessHistoryView
            navigator={navigator}
            model={route.model}
            style={{ flex: 1 }}
          />
        );
      case 'myinvolvehistory':
        return (
          <MyInvolveHistoryComponent
            navigator={navigator}
            route={route}
            style={{ flex: 1 }}
          />
        );
      case 'schedule':
        return <Schedule navigator={navigator} route={route} style={{ flex: 1 }} />;
      case 'workreport':
        return <WorkReportComponent navigator={navigator} route={route} style={{ flex: 1 }} />;
      case 'workreportView':
        return <WorkReportViewComponent navigator={navigator} model={route.obj} />;
      case 'assignment':
        return <AssignmentComponent navigator={navigator} route={route} style={{ flex: 1 }} />;
      case 'assignmentView':
        return <AssignmentViewComponent navigator={navigator} model={route.obj} />;
      case 'setting':
        return <Setting navigator={navigator} model={route} style={{ flex: 1 }} />;
      case 'login':
        return (
          <LoginComponent
            navigator={navigator}
            nextPromise={route.nextPromiseFunc}
          />
        );
      default:
    }

    return null;
  },
};

module.exports = routes;
