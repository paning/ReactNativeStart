import {Component} from 'react';
import {
  AsyncStorage,
} from 'react-native';

export default class Storage extends Component {
  static async readData(STORAGE_KEY) {
    try {
      const value = await
      AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        // We have data!!
        console.log(value);
        return value;
      }

      return null;
    } catch (error) {
      // Error retrieving data
      return null;
    }
  }

  static async saveData(STORAGE_KEY, value) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      // Error saving data
    }
  }

  static async removeData(STORAGE_KEY) {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }
}
