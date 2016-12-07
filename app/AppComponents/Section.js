/**
 * @flow
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderColor: '#C8C7CC',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default class Section extends Component {
  static propTypes = {
    children: React.PropTypes.any,
    style: React.PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <View style={[styles.section, this.props.style]}>
        { this.props.children }
      </View>
    );
  }
}

