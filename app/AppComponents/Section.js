/**
 * @flow
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Color from '../CommonComponents/Colors';

const styles = StyleSheet.create({
  sectionWithName: {
    backgroundColor: '#fff',
    borderColor: '#C8C7CC',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  sectionNoName: {
    backgroundColor: '#fff',
    borderColor: '#C8C7CC',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
  },

  sectionName: {
    marginTop: 10,
  },
  sectionNameText: {
    fontSize: 12,
    marginLeft: 10,
    color: Color.textBlack,
  },
});

export default class Section extends Component {
  static propTypes = {
    children: React.PropTypes.any,
    style: React.PropTypes.any,
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const name = this.props.name || '';
    if (name === '') {
      return (
        <View style={[styles.sectionNoName, this.props.style]}>
          {this.props.children}
        </View>
      );
    }

    return (
      <View style={styles.sectionName}>
        <Text style={styles.sectionNameText}>{this.props.name}</Text>
        <View style={[styles.sectionWithName, this.props.style]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

