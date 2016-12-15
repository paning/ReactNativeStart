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

export default class OA extends Component {
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
            <TouchableOpacity style={styles.item} onPress={() => this.onPress('mainwork')}>
              <Icon
                name={'random'}
                size={30}
                style={{ paddingRight: 10, marginTop: 10 }}
                color={Colors.blue}
              />
              <Text>流程申请</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.item} onPress={() => this.onPress('recruitapply')}>
              <Icon
                name={'user'}
                size={30}
                style={{ paddingRight: 10, marginTop: 10 }}
                color={Colors.blue}
              />
              <Text>用工申请</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.item} onPress={() => this.onPress('employapply')}>
              <Icon
                name={'user-plus'}
                size={30}
                style={{ paddingRight: 10, marginTop: 10 }}
                color={Colors.blue}
              />
              <Text>入职申请</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.item} onPress={() => this.onPress('meetingapply')}>
              <Icon
                name={'building'}
                size={30}
                style={{ paddingRight: 10, marginTop: 10 }}
                color={Colors.blue}
              />
              <Text>会议室申请</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.item} onPress={() => this.onPress('sealapply')}>
              <Icon
                name={'ge'}
                size={30}
                style={{ paddingRight: 10, marginTop: 10 }}
                color={Colors.blue}
              />
              <Text>印章使用申请</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.item} onPress={() => this.onPress('carapply')}>
              <Icon
                name={'car'}
                size={30}
                style={{ paddingRight: 10, marginTop: 10 }}
                color={Colors.blue}
              />
              <Text>公务用车申请</Text>
            </TouchableOpacity>
          </View>
        </Section>
        <Section style={styles.group}>
          <View>
            <TouchableOpacity style={styles.item} onPress={() => this.onPress('task')}>
              <Icon
                name={'tasks'}
                size={30}
                style={{ paddingRight: 10, marginTop: 10 }}
                color={Colors.blue}
              />
              <Text>代办流程</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.item} onPress={() => this.onPress('myprocesshistory')}>
              <Icon
                name={'history'}
                size={30}
                style={{ paddingRight: 10, marginTop: 10 }}
                color={Colors.blue}
              />
              <Text>我的流程</Text>
            </TouchableOpacity>
          </View>
        </Section>
      </View>
    );
  }
}
