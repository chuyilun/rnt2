import React, { Component }  from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from "react-native";
import styles, { colors } from './styles/index.style';
import Slider from './scene/sliderbox';
import Pic from './scene/pic';
import Game from './scene/game';

export const ImageBtn = ({ navigation }) => {
  
    return(
    <ScreenContainer>
      <Slider/>
      <View style={ styles.contain}>
        <TouchableOpacity style={ styles.container1 } onPress={() => navigation.push('SpecialEffects')} >
          <Image source={require('./assets/camera.png')} style={styles.imgiconstyle}/>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.container2 } onPress={() => navigation.push('CA')} >
          <Image source={require('./assets/eye.png')} style={styles.imgiconstyle}/>
        </TouchableOpacity>
      </View>
      <View style={ styles.contain}>
        <TouchableOpacity style={ styles.container1 } onPress={() => navigation.push('FaceGame')} >
          <Image source={require('./assets/game.png')} style={styles.imgiconstyle}/>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.container2 } onPress={() => navigation.push('CA')} >
          <Image source={require('./assets/wifi.png')} style={styles.imgiconstyle}/>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
    );
  };
  
  export const SSSS = ({ navigation }) => {
    return (
      <ScreenContainer>
        <Text> Sign </Text>
        <Button title="Sign" onPress={() => alert("gogo !")} />
        <Button title="Wow" onPress={() => navigation.push('CA')} />
      </ScreenContainer>
    );
  };
  
  export const CA =({ navigation }) => {
    return(
      <ScreenContainer>
        <Text> Create </Text>
        <Button title="Now" onPress={() => alert("Now on")} />
      </ScreenContainer>
    );
  };
  
  export const SpecialEffects =({ navigation }) => {
    return(
      <ScreenContainer>
        <Pic/>
      </ScreenContainer>
    );
  };
  
  export const FaceGame =({ navigation }) => {
    return(
      <ScreenContainer>
        <Game/>
      </ScreenContainer>
    );
  };

  const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
  );
  