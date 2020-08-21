import React, {Component} from 'react';
import { Router, Stack, Scene, Tabs, NavBar } from 'react-native-router-flux';
import { StyleSheet, Text, Image, View, TextInput, Button, TouchableOpacity} from 'react-native';

import Nav from '../scene/nav';
import Slider from '../scene/sliderbox';


export default class Routes extends Component {
  constructor(props){
    super(props);
    this.state = {
      tab: 'home'
    }
  }
  render() {
    return (
      <Router>
          <Stack 
            key="home" hideNavBar
          >
            <Scene key="nav" component={Nav}/>
          </Stack>
      </Router>
    );
  }
}