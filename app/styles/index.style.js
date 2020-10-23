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
    // backgroundColor: 'gray',
  },
  image_d: {
    width: 350, 
    height: 350, 
    resizeMode: 'contain',
  },
  text: {
    fontSize:15
  },
  btnn: {
    alignItems: "center",
    justifyContent: 'center',
    padding: 10
  },
  text_st: {
    alignItems: "center",
    justifyContent: 'center',
    fontSize : 20,
    fontWeight: 'bold'
  },
  text_view: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },
  button_d: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
    justifyContent: 'center',  
  },
  upload: {
    padding: 5,
    margin: 0,
    backgroundColor: '#ff69b4',
  },
  vs: {
    fontSize:15,
    margin: 7,
  },
  Pic_container: {
    flex:1,
    marginTop: 30,
    backgroundColor: '#dddddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_pic: {
    flex: 9,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Pic_image: {
    width: 300, 
    height: 400, 
    backgroundColor: 'gray'
  },
  Pic_button: {
    marginTop:30,
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },
  coin: {
    justifyContent: 'center',
    alignItems: 'center',
    width:50,
    height:50,
    resizeMode:'contain',
  },
  coinText: {
    fontSize:30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },



});