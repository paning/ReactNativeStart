import { StyleSheet } from 'react-native';
import Colors from './Colors';

const paddingLeft = 10;

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackGroundColor,
    marginTop: 44,
  },

  shadowLine: {
    shadowColor: '#999999',
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },

  sepLine: {
    backgroundColor: Colors.backGray,
    height: 0.5,
  },

  rowView: {
    flexDirection: 'row',
    backgroundColor: '#fcfcfc',
  },

  rowSubView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    marginLeft: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },

  rowBetweenView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowBetweenLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowBetweenRightView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowContentView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },

  rowLineRightContentView: {
    flexDirection: 'row',
  },

  rowContent: {
    flex: 1,
    flexDirection: 'column',
  },

  rowLineBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowLineTitle: {
    color: 'black',
  },

  rowLineContent: {
    fontSize: 14,
    color: '#aaaaaa',
  },

  sectionLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#C8C7CC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  sectionLineTitleText: {
    padding: 10,
    color: '#000000',
  },

  sectionLineContentText: {
    padding: 10,
    color: '#C7C7CC',
  },
});

module.exports = CommonStyles;
