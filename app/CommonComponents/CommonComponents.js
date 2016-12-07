import React, { Component } from 'react';
import Colors from './Colors';
import CommonStyles from './CommonStyles';
import Platform from 'Platform';

import {
  StyleSheet,
  View,
  ActivityIndicatorIOS,
  Text,
  ActivityIndicator,
} from 'react-native';

class CommonComponents {
  static renderLoadingView() {
    if (Platform.OS === 'android') {
      return (
        <View style={CommonStyles.container}>
          <ActivityIndicator styleAttr="Inverse"/>
        </View>
      )
    } else if (Platform.OS === 'ios') {
      return (
        <View style={CommonStyles.container}>
          <ActivityIndicatorIOS size="large" />
        </View>
      );
    }
  }

  static renderPlaceholder(text, image, onPress) {
    return (
      <View>
      </View>
    )
  }

  static renderSepLine() {
    return (
      <View style={CommonStyles.sepLine}>
      </View>
    )
  }
}

module.exports = CommonComponents;
