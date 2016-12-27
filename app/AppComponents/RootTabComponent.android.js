import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import {
  StyleSheet,
  View,
} from 'react-native';

import TabBar from './TabBar.android';
import Routes from './Routes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default function RootTab() {
  return (
    <View style={styles.container}>
      <ScrollableTabView
        locked
        renderTabBar={() => <TabBar />}
        tabBarPosition={'bottom'}
      >
        {Routes.navigator('oa')}
        {Routes.navigator('schedule')}
        {Routes.navigator('setting')}
      </ScrollableTabView>
    </View>
  );
}

