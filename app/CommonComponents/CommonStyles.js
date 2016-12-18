import { StyleSheet } from 'react-native';
import Colors from './Colors';

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
    padding: 10,
    borderColor: '#C8C7CC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  sectionLineRightView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionLineTitleText: {
    color: '#000000',
  },

  sectionLineContentText: {
    color: '#C7C7CC',
  },

  htmlText: {
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EDECF1',
    fontSize: 40,
  },
});

module.exports = CommonStyles;
