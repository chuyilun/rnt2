import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity, TouchableHighlight, ImageBackground, Button, Animated } from 'react-native';
import ModalImage from "react-modal-image";
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '../config';
import Modal from 'react-native-modal';


const data = [
  { imageUri: require('../assets/p5.png') }, 
  { imageUri: require('../assets/p4.png') }, 
  { imageUri: require('../assets/p3.png') }, 
  { imageUri: require('../assets/p2.png') }, 
  { imageUri: require('../assets/p1.png') }, 
  { imageUri: require('../assets/hotpot.png') }, 
  { imageUri: require('../assets/p5.png') }, 
  { imageUri: require('../assets/p4.png') }, 
  { imageUri: require('../assets/p3.png') }, 
  { imageUri: require('../assets/p2.png') }, 
  { imageUri: require('../assets/p1.png') }, 
  { imageUri: require('../assets/hotpot.png') },   
  { imageUri: require('../assets/p5.png') },
  { imageUri: require('../assets/p4.png') }, 
  { imageUri: require('../assets/p3.png') }, 
  { imageUri: require('../assets/p2.png') }, 
  { imageUri: require('../assets/p1.png') }, 
  { imageUri: require('../assets/hotpot.png')},   
  { imageUri: require('../assets/p5.png') }, 
  { imageUri: require('../assets/p4.png') }, 
  { imageUri: require('../assets/p3.png') }, 
  { imageUri: require('../assets/p2.png') }, 
  { imageUri: require('../assets/p1.png') }, 
  { imageUri: require('../assets/hotpot.png')}, 
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};



const numColumns = 3;


export default class Myplanet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showmodal: false,
      count: 0,
      user:"",
      has_planet:[],
      dataBlog:[],
      A_name:"",
      A_image:"",
      A_content:"",
      _scrollX: false,
    };

  }




  componentDidMount = () => {

    //console.log('STARTTTTT');

    this.setState({ user: "" , has_planet: [] });
    this.get_planet();

  }


  get_planet = () => {

   // var user = firebase.auth().currentUser;
    var firebaseRef = firebase.database().ref('/user_has_planet/' + 'vg0kYrb1J3YooiSfStp0guAKGPg2'); //user.uid

    console.log(firebaseRef);

    firebaseRef.on("child_added", snapshot => {
      console.log('firebase', snapshot.val().image);
      console.log('firebase', snapshot.val().name);
      console.log('firebase', snapshot.val().content);

      this.setState(prevState => ({
        has_planet: [...prevState.has_planet,[snapshot.val().image,snapshot.val().name,snapshot.val().content]],
      }))
    }).bind(this);

    console.log(this.state.has_planet);
  }

  // load_has_planet = () => {

  //   console.log('load',this.state.has_planet);

  //   var uri = this.state.has_planet;

  //   const data_2 = uri.map((uri) => {});

  //   console.log("in load",data_2);
  // }

    //   <Button
    //   title='123'
    //   onPress={this.handleAddCount}
    // />

    // <TouchableOpacity onPress={() => this.handleAddCount(true)} >
    // </TouchableOpacity>

    handleAddCount(visible){
      this.setState({ showmodal: visible });
    };

    // handleAddCount = () => {
    //   this.setState({ this.state.showmodal });
    // };

    // componentDidUpdate() {
    //     handleAddCount(() => {
    //       this.setState({ showmodal: true
    //     })
    // }, 1000);
    // }

    Setname(visible,te,ab,xy){
      console.log(te);
      this.setState({ showmodal: visible ,A_name: te, A_image: ab, A_content: xy});
    };





      renderItem = ({ item, index, text }) => {
        if (item.empty === true) {
          return <View style={[styles.item, styles.itemInvisible]} />;
        }

        console.log(this.state.has_planet);

          console.log(item.text);


          // <Text>{item.text}</Text>
          return (
            <View>
              <View style={styles.item}>
                <TouchableOpacity onPress={() => this.Setname(true,item.text,item.imageUri,item.content)} >
                  <Image source={{uri: item.imageUri}} style={styles.buttonImageIconStyle} /> 
                </TouchableOpacity>
              </View> 
            </View>

    );
  };


          //<Text style={styles.itemText}>{item.key}</Text>

  render() {
  
    console.log(this.state.has_planet);
    let datalist = this.state.has_planet //getåˆ°å…©çµ„dataï¼Œimageè·Ÿnameï¼Œåˆ†åˆ¥ç‚ºitem[0]å’Œitem[1]
    let dataBlog = []; //pushåˆ°æ–°array(dataBlog)ï¼Œarray[0]=image.array[...]ï¼Œarray[1]=name.array[...]

    datalist.map((item) => {
      dataBlog.push({
        imageUri:item[0],
        text: item[1],
        content: item[2],
      })
    })
    console.log(dataBlog);

    return (

      <ImageBackground source={ require('../assets/starsky.jpg') } style={styles.container2} >
              <Text style={styles.itemText}>My Planet</Text>
          <FlatList
            data={formatData(dataBlog, numColumns)}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={numColumns}
          />

            <Modal visible={this.state.showmodal} animationType='fade'>
              {/* <ImageBackground source={require('./assets/12345.png')} style={{width:Dimensions.get('window').width-20 , height:Dimensions.get('window').height-250 }}> */}
                <View style={{ opacity: 0.99,
                               backgroundColor: '#47517d',
                               borderRadius:10 , 
                               bottom: -10,
                               left:10,
                               width: Dimensions.get('window').width-50, 
                               height: Dimensions.get('window').height-250,
                               borderWidth:8,
                               borderColor:'#81C0C0'
                              }} 
                  >            

                    
                <View>
                    <View style={{backgroundColor:''}}>
                    <TouchableOpacity style={{height:Dimensions.get('window').height/8 ,width: Dimensions.get('window').width-50 }} onPress={() => this.Setname(false, null)}>
                    <Image source={require('../assets/close.png')} style={{height:30,width:30,bottom:-10,left:10}}/>
                    </TouchableOpacity>
                    </View>

                    <View style={{backgroundColor:''}}>
                      <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Image source={{uri: this.state.A_image}} style={{height:175,width:175}}/> 
                      </View>
                      <Text style={{color: '#FFFFB9', textAlign: 'center', fontSize: 25,fontWeight:'bold',bottom:250}}>{this.state.A_name}</Text>
                    </View>
                  <View>
                    <Text style={{color: 'white', bottom:10, fontSize:15, width: Dimensions.get('window').width-50, height: Dimensions.get('window').height-300,}}>{this.state.A_content}</Text>                    
                  </View>


                </View>
              </View>
              {/* </ImageBackground> */}
            </Modal>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginVertical: 20,
  },
  container3: {
    flex: 0.1,
    height: 70,
    marginVertical: 20,
  },
  item: {
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius : 10,
    //flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    color: 'transparent'
  },
  itemText: {
    fontSize: 45,
    width: 500,
    height: 70,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    //flex: 0.08,
    color: 'white',
    
  },
  buttonImageIconStyle: {
    backgroundColor: '#00000000',
    padding: 60,
    // opacity: 0.5,
    //margin: 5,
   
    bottom: 0,
    width: 25,
    //resizeMode: 'stretch',
  },
  buttonImageIconStyle_modal: {
    marginLeft:50,
    bottom: 100,
    padding:80,
    width:100,
    resizeMode:'contain'
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#E0F7FA',
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  }
});