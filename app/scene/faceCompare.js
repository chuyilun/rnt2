import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import { render,ReactDOM } from 'react-dom';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/index.style';


class Pic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      image: null,
      image_64: null,
      fetch_img_64 : null,
      image_2: null,
      image_64_2 : null,
      fetch_img_64_2 : null,
      confidence: null,
      con_result: null
    };
  }

  getFetch=()=>{

   if(this.state.image_64 && this.state.image_2!= null){

    fetch('http://172.31.250.14:5000/up_photo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fetch_img_64: this.state.image_64,
        fetch_img_64_2: this.state.image_64_2
      })
    }).then(response =>
      response.json().then(data => {
    
        this.setState({confidence: data.result, con_result:'相似度:'+ data.result +'%'});
        console.log("success fetch :",data);
      })
    );
    }
    else{
      alert("Please select a picture or shoot!");
    }

  };

  getFetch2=()=>{

    if(this.state.image_64 && this.state.image_2!= null){
 
     fetch('http://172.31.250.14:5000/up_photo', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         fetch_img_64_2: this.state.image_64_2,
       })
     }).then(response =>
       response.json().then(data => {
         console.log("success fetch :",data);
         this.setState({text1: data.fetch_img_64_2});
       })
     );
     }
     else{
       alert("Please select a picture or shoot!");
     }
 
   };
  
  
  selectPicture = async () => {    //從相簿選
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri, base64 } = await ImagePicker.launchImageLibraryAsync({
       aspect: [9, 9],
       allowsEditing: true,
       base64: true
    });
    if (!cancelled) this.setState({ image: uri , image_64: base64}); //把image設成回傳的uri , image_64設成回傳的base64碼
    console.log("image uri from phone:",this.state.image);
    //console.log("image uri base64 from phone:",this.state.image_64);
  };

  selectPicture2 = async () => {    //從相簿選
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri, base64 } = await ImagePicker.launchImageLibraryAsync({
       aspect: [9, 9],
       allowsEditing: true,
       base64: true
    });
    if (!cancelled) this.setState({ image_2: uri , image_64_2: base64}); //把image設成回傳的uri , image_64設成回傳的base64碼
    console.log("image uri from phone:",this.state.image_2);
    //console.log("image uri base64 from phone:",this.state.image_64);
  };
  
  takePicture = async () => {   //camera
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      base64: true
    });
    this.setState({ image: uri , image_64: base64});
    console.log("image uri from camera:",this.state.image);
    //console.log("image uri from camera:",this.state.image_64);
  };

  takePicture2 = async () => {   //camera
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      base64: true
    });
    this.setState({ image_2: uri , image_64_2: base64});
    console.log("image uri from camera:",this.state.image_2);
    //console.log("image uri from camera:",this.state.image_64);
  };



  render() {
    return (
      <View style={styles.container_pic}>
        
        <Image style={styles.image} source={{ uri: this.state.image}} />
        <View style={styles.contain}>
          <TouchableOpacity style={styles.button} onPress={this.selectPicture}>
            <Text style={styles.text}>Gallery1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.takePicture}>
            <Text style={styles.text}>Camera1</Text>
          </TouchableOpacity>
          
        </View>

        <TouchableOpacity style={styles.upload} onPress= {this.getFetch} >
            <Text style={styles.text}>Upload!1</Text>
        </TouchableOpacity>

        <Text style={styles.vs}>V.S.</Text>
        <Text style={styles.vs}>{this.state.con_result}</Text>
        
        <Image style={styles.image} source={{ uri: this.state.image_2}} />
        <View style={styles.contain}>
          <TouchableOpacity style={styles.button} onPress={this.selectPicture2}>
            <Text style={styles.text}>Gallery2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.takePicture2}>
            <Text style={styles.text}>Camera2</Text>
          </TouchableOpacity>
        </View>

        <Text>Hello</Text>
        
      </View>
    )
  }
  

  
}

export default function App() {
    
  return (
  <View style={styles.container}>
      <Pic />
  </View>      
   );

}










