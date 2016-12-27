import { Dimensions } from 'react-native';

const Global = {
  PASSWORD: 'password',
  USER_NAME: 'username',
  drawerWidth: (Dimensions.get('window').width / 5) * 4,
};

module.exports = Global;
