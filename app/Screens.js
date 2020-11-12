import React, { Component, useState  }  from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from "react-native";
import styles, { colors } from './styles/index.style';
import Slider from './scene/sliderbox';
import Pic from './scene/pic';
import Game from './scene/game';
import FaceCompare from './scene/faceCompare';
import Draw from './scene/drawCard';
import TopMess from './scene/topMess';
import Register from './scene/registerScreen';
import Login from './scene/loginScreen';
import * as firebase from 'firebase';
  
export const LoginScreen =({ navigation }) => {

      const [errorMessage, seterrorMessage ] = useState(null)

 function handleLogin() { //登入

    // console.log(gemail)
    // console.log(gpassword)

    firebase
      .auth()
      .signInWithEmailAndPassword(gemail, gpassword)
      .catch(error => seterrorMessage({errorMessage: error.message}))

      // console.log(email)
      console.log(errorMessage)

    if (errorMessage === null){
      console.log('ssssss')
      global.show = false
      navigation.push('ImageBtn')
    }
  };
  return(
    <ScreenContainer>
        <Login/>
        <View >
          <Text>{seterrorMessage}qqqq</Text>
      </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: "#FFF", fontWeight:"500"}}>Sign in</Text>
      </TouchableOpacity>
        <TouchableOpacity 
        style={{ alignSelf: "center",marginTop: 32}} 
        onPress={() => navigation.push('RegisterScreen')}> 
          <Text style={{color: "#414959", fontSize: 13}}>
            New to APP?  <Text style={{fontWeight: "500",color: "#E9446A"}}>Sign up</Text>
          </Text>
        </TouchableOpacity>
    </ScreenContainer>
  );
};

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


  export const RegisterScreen =({ navigation }) => {
    return(
      <ScreenContainer>
          <Register/>
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
  