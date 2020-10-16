import React, { Component } from 'react';
import styles, { colors } from '../styles/index.style';
import { Text, View, StyleSheet, TouchableOpacity, Image, Navigator, AppRegistry } from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

export default class Routes extends Component {
  
    constructor(props) {     
      super(props);     
      this.state = {       
          images: [         
          "https://imgur.com/CPFGvXE.png",
          "https://imgur.com/Wrsr9YF.png",
          "https://imgur.com/5N40hHC.png",
          "https://imgur.com/hTGfNxv.jpg", // Network image   
          ]     
      };   
    }
    render(){
        return( 
          <View  style={ styles.container }>
            <SliderBox 
              images={this.state.images}
              resizeMode = { 'contain' }
              autoplay
              circleLoop
            />
          </View>
        )
    }
}