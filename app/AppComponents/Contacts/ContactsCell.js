import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../CommonComponents/Colors';
import Styles from '../../CommonComponents/CommonStyles';
import defaultImage from '../../image/default_user.png';

export default class ContactsCell extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    cell: React.PropTypes.object,
  };

  viewDetail() {
    const cell = this.props.cell;
    this.props.navigator.push({ id: 'contactsView', obj: cell });
  }

  render() {
    const cell = this.props.cell;
    let userImage;
    if (cell.icon !== null) {
      userImage = { uri: cell.icon };
    } else {
      userImage = defaultImage;
    }

    return (
      <TouchableHighlight onPress={() => this.viewDetail()}>
        <View style={Styles.rowView}>
          <View style={Styles.rowSubView}>
            <View style={Styles.rowBetweenView}>
              <View style={Styles.rowBetweenLeftView}>
                <Image source={userImage} style={{ height: 30, width: 30 }} />
                <Text style={[Styles.rowLineTitle, { paddingLeft: 5 }]}>
                  {cell.name}
                </Text>
              </View>
              <View style={Styles.rowBetweenRightView}>
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
      </TouchableHighlight>
    );
  }
}
