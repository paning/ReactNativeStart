import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../CommonComponents/Colors';
import Style from '../../CommonComponents/CommonStyles';

export default class MyProcessHistoryCell extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    cell: React.PropTypes.object,
  };

  viewDetail() {
    const cell = this.props.cell;
    this.props.navigator.push({ id: 'myProcessHistoryView', model: cell });
  }

  render() {
    const cell = this.props.cell;
    const row = (
      <TouchableHighlight onPress={() => this.viewDetail()} underlayColor={Colors.lightGray}>
        <View style={Style.rowView}>
          <View style={Style.rowSubView}>
            <View style={Style.rowBetweenView}>
              <View style={Style.rowBetweenLeftView}>
                <Text style={Style.rowLineTitle}>
                  {cell.name}
                </Text>
              </View>
              <View style={Style.rowBetweenRightView}>
                <Text style={Style.rowLineContent}>
                  {cell.status}
                </Text>
                <Icon
                  name={'angle-right'}
                  size={24}
                  style={{ paddingLeft: 10 }}
                  color={Colors.sectionLineIconColor}
                />
              </View>
            </View>
          </View>
        </View>
      < / TouchableHighlight >
    );
    return (
      row
    );
  }
}
