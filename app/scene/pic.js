import { Text, View, StyleSheet, TouchableOpacity, Image, Navigator, AppRegistry } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import React, { useState , Component } from 'react';
import styles from '../styles/index.style';

export default class Routes extends Component {

    constructor(props) {
        super(props);
        this.state = {
          image: null,
          image_64 : null,
          fetch_img_64 : null
        };
      }
    
      getFetch2=()=>{
    
       if(this.state.image_64 != null){
    
        fetch('http://d03ef9df956d.ngrok.io/api', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fetch_img_64: this.state.image_64,
          })
        }).then(response =>
          response.json().then(data => {
            console.log("success fetch :",data);
            this.setState({text: data.fetch_img_64});
          })
        );
        }
        else{
          alert("Please select a picture or shoot!");
        }
    
      };
      
      selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, uri, base64 } = await ImagePicker.launchImageLibraryAsync({
           aspect: [9, 9],
           allowsEditing: true,
           base64: true
        });
        if (!cancelled) this.setState({ image: uri , image_64: base64});
        console.log("image uri from phone:",this.state.image);
        console.log("image uri base64 from phone:",this.state.image_64);
      };
    
      takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
          allowsEditing: false,
          base64: true
        });
        this.setState({ image: uri , image_64: base64});
        console.log("image uri from camera:",this.state.image);
        console.log("image uri from camera:",this.state.image_64);
      };
    
      Upload_to_fetch = () => {
    
        if(this.state.image_64 != null){
           <Fetch_flask img_base64 = {this.state.image_64}/>
           alert("Upload Success!")
        }
        else
           alert("Please Select a photo!");
    
      }
    
    
      render() {
        return (
          <View style={styles.container_pic}>
            <Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,'+this.state.fetch_img_64}} />
            <View style={styles.contain}>
              <TouchableOpacity style={styles.btnstyle} onPress={this.selectPicture}>
                <Text style={styles.text}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnstyle} onPress={this.takePicture}>
                <Text style={styles.text}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnstyle} onPress= {this.getFetch2} >
                <Text style={styles.text}>Upload!</Text>
              </TouchableOpacity>
            </View>
            <Text>Hello, {this.state.image_64}</Text>
          </View>
        )
      }

}