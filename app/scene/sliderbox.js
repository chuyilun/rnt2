import React, { Component } from 'react';
import styles, { colors } from '../styles/index.style';
import { Text, View, StyleSheet, TouchableOpacity, Image, Navigator, AppRegistry } from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

export default class Routes extends Component {
  
    constructor(props) {     
      super(props);     
      this.state = {       
          images: [         
            require('../assets/photo-camera.png'),
            require('../assets/team_0.png'),
            require('../assets/rocket_index.png'),
            require('../assets/lottery-game.png'), // Network image   
          ]     
      };   
    }
    render(){
        return( 
          <View  style={ { flex: 1,}}>
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