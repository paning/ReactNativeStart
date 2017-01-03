import { StyleSheet } from 'react-native';
import Colors from './Colors';

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackGroundColor,
    marginTop: 44,
  },

  containerNoMargin: {
    flex: 1,
    backgroundColor: Colors.mainBackGroundColor,
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

  searchSingleSelectView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchSingleSelectChecked: {
    width: 60,
    height: 30,
    margin: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: Colors.red,
  },
  searchSingleSelectUnChecked: {
    width: 60,
    height: 30,
    margin: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: Colors.blue,
  },
  searchSingleSelectText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
  searchButtonView: {
    backgroundColor: Colors.green,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  searchConfirmButton: {
    flex: 1,
    backgroundColor: Colors.red,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    color: 'white',
  },
  searchResetButton: {
    flex: 1,
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    color: 'black',
  },

  sectionLineView: {
    marginLeft: 10,
    borderColor: '#C8C7CC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  sectionLineLeftView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  sectionLineRightView: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  sectionLineTitleText: {
    color: '#000000',
  },

  sectionLineContentText: {
    color: '#C7C7CC',
    textAlign: 'right',
    fontStyle: 'italic',
  },

});

module.exports = CommonStyles;
