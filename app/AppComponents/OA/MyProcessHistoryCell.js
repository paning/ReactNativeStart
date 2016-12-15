import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../CommonComponents/Colors';
import Style from '../../CommonComponents/CommonStyles';
import { AnalysisTask } from '../../CommonComponents/FormatUtil';

const CarImage = require('../../image/carapplys.png');
const EmployImage = require('../../image/employapplys.png');
const MeetingImage = require('../../image/meetingapplys.png');
const RecruitImage = require('../../image/recruitapplys.png');
const SealImage = require('../../image/sealapplys.png');

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
    let imageUrl;
    switch (AnalysisTask(this.props.cell.businessKey)) {
      case 'sealapplys':
        imageUrl = SealImage;
        break;
      case 'carapplys':
        imageUrl = CarImage;
        break;
      case 'meetingapplys':
        imageUrl = MeetingImage;
        break;
      case 'recruitapplys':
        imageUrl = RecruitImage;
        break;
      case 'employapplys':
        imageUrl = EmployImage;
        break;
      default:
        break;
    }

    const row = (
      <TouchableHighlight onPress={() => this.viewDetail()} underlayColor={Colors.lightGray}>
        <View style={Style.rowView}>
          <View style={Style.rowSubView}>
            <View style={Style.rowBetweenView}>
              <View style={Style.rowBetweenLeftView}>
                <Image source={imageUrl} style={{ height: 30, width: 30 }} />
                <Text style={[Style.rowLineTitle, { paddingLeft: 5 }]}>
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
      </TouchableHighlight >
    );
    return (
      row
    );
  }
}
