import React, { Component } from 'react';
import styles, { colors } from '../styles/index.style';
import { Text, View, StyleSheet, TouchableOpacity, Image, Navigator, AppRegistry } from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

export default class Routes extends Component {
  
    constructor(props) {     
      super(props);     
      this.state = {       
          images: [         
            require('../assets/slider_1.jpg'),
            require('../assets/slider_2.jpg'),
            require('../assets/slider_3.jpg'),
            require('../assets/datinghoney.png'), // Network image   
          ]     
      };   
    }
    render(){
        return( 
          <View>
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