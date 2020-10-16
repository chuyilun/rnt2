import React, { Component }  from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from "react-native";
import styles, { colors } from './styles/index.style';
import Slider from './scene/sliderbox';
import Pic from './scene/pic';
import Game from './scene/game';
import FaceCompare from './scene/faceCompare';
import Draw from './scene/drawCard';
import TopMess from './scene/topMess';

export const ImageBtn = ({ navigation }) => {
  
    return(
    <ScreenContainer>
      
      <View style= {{flex:1}}>
        <TopMess/>
      </View>
      <View style= {{flex:6}}>
        <Slider/>
      </View>
      <View style= {{flex:6}}>
        <View style={ styles.contain}>
          <TouchableOpacity style={ styles.container1 } onPress={() => navigation.push('SpecialEffects')} >
            <Image source={require('./assets/camera.png')} style={styles.imgiconstyle}/>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.container2 } onPress={() => navigation.push('Compare')} >
            <Image source={require('./assets/eye.png')} style={styles.imgiconstyle}/>
          </TouchableOpacity>
        </View>
        <View style={ styles.contain}>
          <TouchableOpacity style={ styles.container1 } onPress={() => navigation.push('FaceGame')} >
            <Image source={require('./assets/game.png')} style={styles.imgiconstyle}/>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.container2 } onPress={() => navigation.push('DrawCard')} >
            <Image source={require('./assets/wifi.png')} style={styles.imgiconstyle}/>
          </TouchableOpacity>
        </View> 
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
  
  export const DrawCard =({ navigation }) => {
    return(
      <ScreenContainer>
          <Draw/>
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

  export const Compare =({ navigation }) => {
    return(
      <ScreenContainer>
        <FaceCompare/>
      </ScreenContainer>
    );
  };

  const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
  );
  