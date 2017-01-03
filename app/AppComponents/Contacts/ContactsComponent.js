import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

import KService from '../../NetworkService/KalixServices';
import ContactsCell from './ContactsCell';
import RefreshListView from '../SectionListView';
import Styles from '../../CommonComponents/CommonStyles';
import ErrorPlaceholder from '../../CommonComponents/ErrorPlacehoderComponent';

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

export default class ContactsComponent extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    route: React.PropTypes.object,
  };

  static reloadPath() {
    const sortJson = {};
    sortJson.property = 'phone';
    sortJson.direction = 'ASC';
    const path = `${KService.restPath()}/users?sort=[${JSON.stringify(sortJson)}]`;
    return encodeURI(path);
  }

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

  renderRow(rowData) {
    return (
      <ContactsCell cell={rowData} navigator={this.props.navigator} />
    );
  }

  renderSectionHeader(sectionData) {
    if (sectionData.row[0] !== undefined) {
      return (
        <View style={{ paddingLeft: 10, paddingTop: 5, paddingBottom: 5 }}>
          <Text>{sectionData.section}</Text>
        </View>
      );
    }

    return null;
  }

  render() {
    return (
      <View style={Styles.container}>
        <RefreshListView
          ref={(ref) => { this.listView = ref; }}
          enablePullToRefresh
          renderRow={rowData => this.renderRow(rowData)}
          renderSectionHeader={this.renderSectionHeader}
          reloadPromisePath={() => ContactsComponent.reloadPath()}
          handleReloadData={ContactsComponent.handleReloadData}
          navigator={this.props.navigator}
          maxPage={1}
          contentInset={{ top: 64, left: 0, bottom: 49, right: 0 }}
          contentOffset={{ x: 0, y: -64 }}
        />
      </View>
    );
  }
}
