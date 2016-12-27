/**
 * Created by Administrator on 2016/12/2.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../CommonComponents/Colors';
import Section from '../Section';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 5,
    marginTop: 39,
    backgroundColor: '#ffffff',
  },
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default class Schedule extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    route: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onPress(id) {
    this.props.navigator.push({ id, route: this.props.route });
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Section style={styles.group}>
          <View>
            <TouchableOpacity style={styles.item} onPress={() => this.onPress('workreport')}>
              <Icon
                name={'tasks'}
                size={30}
                style={{ paddingRight: 10, marginTop: 10 }}
                color={Colors.blue}
              />
              <Text>工作汇报</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.item} onPress={() => this.onPress('assignment')}>
              <Icon
                name={'building'}
                size={30}
                style={{ paddingRight: 10, marginTop: 10 }}
                color={Colors.blue}
              />
              <Text>任务管理</Text>
            </TouchableOpacity>
          </View>
        </Section>
      </View>
    );
  }
}
