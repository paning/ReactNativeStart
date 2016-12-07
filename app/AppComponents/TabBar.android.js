import React, { Component } from 'react';
import Colors from '../CommonComponents/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';

export default class TabBarAndroid extends Component {
  selectedTabIcons: [];
  unselectedTabIcons: [];

  static propTypes = {
    goToPage: React.PropTypes.func, // 跳转到对应tab的方法
    activeTab: React.PropTypes.number, // 当前被选中的tab下标
    tabs: React.PropTypes.array, // 所有tabs集合
    tabNames: React.PropTypes.array, // 保存Tab名称
    tabIconNames: React.PropTypes.array, // 保存Tab图标
  }

  renderTabOption(tab, i) {
    const isTabActive = this.props.activeTab === i;
    const color = isTabActive ? Colors.blue : Colors.textGray;
    const tabName = tab.tabName;
    const iconName = tab.iconName;

    return (
      <TouchableOpacity onPress={() => this.props.goToPage(i)} key={tabName} style={styles.tab}>
        <View style={styles.tabItem}>
          <Icon name={iconName} color={color} size={20} />
          <Text style={[styles.icon, { color }]}>
            {tabName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  componentDidMount() {
    // alert(this.props.tabIconNames);
    // this.setAnimationValue({value: this.props.activeTab});
    // this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  }

  setAnimationValue({ value }) {
    const currentPage = this.props.activeTab;

    this.unselectedTabIcons.forEach((icon, i) => {
      let iconRef = icon;

      if (!icon.setNativeProps && icon !== null) {
        iconRef = icon.refs.icon_image;
      }

      if (value - i >= 0 && value - i <= 1) {
        iconRef.setNativeProps({ opacity: value - i });
      }
      if (i - value >= 0 && i - value <= 1) {
        iconRef.setNativeProps({ opacity: i - value });
      }
    });
  }

  render() {
    return (
      <View>
        <View style={styles.tabs}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabs: {
    height: 49,
    flexDirection: 'row',
    paddingTop: 5,
    borderTopWidth: 0.5,
    borderTopColor: Colors.backGray,
  },
  icon: {

  },
});
