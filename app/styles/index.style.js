import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  containn: {
    flex: 1,
    justifyContent: 'center',       //垂直排列方式
    alignItems: 'center',          //水平排列方式
  },
  contain: {
    flexDirection: 'row',
  },
  container1: {
    flex: 1,
    alignItems: 'center',          //水平排列方式
    justifyContent: 'center',       //垂直排列方式
    // backgroundColor: '#ff0000',
  },
  container2: {
    flex: 1,
    alignItems: 'center',             //水平排列方式
    justifyContent: 'center',       //垂直排列方式
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imgstyle:{
    // flexGrow:1,
    resizeMode: 'contain',              
  },
  btnstyle: {
    // margin: 20,
    padding: 10,
    // paddingLeft: 20,
    // paddingRight: 20,
    // backgroundColor: '#406E9F',
    // borderRadius: 9,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  imgiconstyle: {
    padding: 10,
    margin: 5,
    height: 100,
    width: 100,
  }
});