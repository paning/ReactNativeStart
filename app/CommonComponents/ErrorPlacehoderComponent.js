import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Colors from './Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainBackGroundColor,
    marginTop: 44,
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 2,
  },
  errorTextTitle: {
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
});

export default class ErrorPlaceholder extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    desc: React.PropTypes.string,
    onPress: React.PropTypes.func,
  };

  render() {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTextTitle}>
          {this.props.title}
        </Text>
        <Text style={styles.errorText}>
          {this.props.desc}
        </Text>
        <TouchableOpacity style={styles.reloadText} onPress={this.props.onPress}>
          <Text style={styles.errorText}>
            重新加载
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
