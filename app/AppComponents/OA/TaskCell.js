import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Colors from '../../CommonComponents/Colors';
import { formatStringWithHtml } from '../../CommonComponents/FormatUtil';

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

export default class TaskCell extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    cell: React.PropTypes.object,
  };

  viewDetail() {
    const cell = this.props.cell;
    this.props.navigator.push({ id: 'taskView', model: cell });
  }

  render() {
    const cell = this.props.cell;

    return (
      <TouchableHighlight onPress={() => this.viewDetail()} underlayColor={Colors.lightGray}>
        <View style={styles.cellContentView}>
          <View style={styles.itemRightContent} >
            <Text style={styles.title}>
              {formatStringWithHtml(cell.businessNo)}
            </Text>
            <View style={styles.itemRightBottom} >
              <Text style={styles.userName} >
                {cell.title}
              </Text>
              <Text style={styles.timeAgo} >
                {cell.createTime}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
