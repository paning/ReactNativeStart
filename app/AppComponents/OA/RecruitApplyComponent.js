import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 44,
    backgroundColor: '#ffffff',
  },
});

export default class RecruitApplyComponent extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <Text>RecruitApply</Text>
      </View>
    );
  }
}
