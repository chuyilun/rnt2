import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 10,
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
  btnstyle: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },
  imgiconstyle: {
    padding: 10,
    margin: 5,
    height: 100,
    width: 100,
  },
  container_pic: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  image: {
    width: 300, 
    height: 300, 
    backgroundColor: 'gray',
  },
  text: {
    fontSize:21
  },
});