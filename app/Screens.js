import React, { Component, useState  }  from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { Button } from 'react-native-paper';
import styles, { colors } from './styles/index.style';
import Slider from './scene/sliderbox';
import Pic from './scene/pic';
import Game from './scene/game';
import Draw from './scene/drawCard';
import TopMess from './scene/topMess';
import Register from './scene/RegisterScreen';
import Login from './scene/loginScreen';
import MyPlanet from './scene/Myplanet';
import * as firebase from 'firebase';
import GoTo from "./scene/Document";
import GoHome from "./scene/Result";
import Socketmap from "./scene/socketmapp";
import MessMap from "./scene/socketmap";
  
const image =  require('./assets/starsky.jpg') ;

export const LoginScreen =({ navigation }) => {
  
  const [errorMessage, seterrorMessage ] = useState(null)

  function handleLogin() { //登入

    console.log(gemail)
    console.log(gpassword)

    firebase
      .auth()
      .signInWithEmailAndPassword(gemail, gpassword)
      .catch(error => seterrorMessage({errorMessage: error.message}))

      // console.log(gemail)
      // console.log(currentuser)

    if (errorMessage === null){
      global.show = false

      var user = firebase.auth().currentUser;
      // console.log(user.type)
      //  if (user != null) { this.setState({email: user.email , uid: user.uid}) };
      var firebaseRef =  firebase.database().ref('/users/' + user.uid + '/type');
  
      firebaseRef.on('value', snapshot => {
        console.log(snapshot.val());
        if(snapshot.val()=== "NO"){

          navigation.push('Document_go');
        }
        else if(global.result && global.big_open){
          navigation.push('Result_go');
        }else{
          navigation.push('ImageBtn');
        }
        
       }); 
    }
  };
  return(
    <ScreenContainer>
      <Login/>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ color: "#FFF", fontWeight:"500"}}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={{ alignSelf: "center",marginTop: 32, }} 
        onPress={() => navigation.push('RegisterScreen')}> 
          <Text style={{color: "#fff", fontSize: 13}}>
            New to APP?  <Text style={{fontWeight: "500",color: "#E9446A"}}>Sign up</Text>
          </Text>
        </TouchableOpacity>
    </ScreenContainer>
  );
};

export const ImageBtn = ({ navigation }) => {
    var user = firebase.auth().currentUser;
    var usernname;
    
    var firebaseRef =  firebase.database().ref('/users/' + user.uid + '/username');
    firebaseRef.on('value', snapshot => {
      console.log(snapshot.val());
      usernname=snapshot.val();
     }); 

    return(
    <ScreenContainer>
      <View style= {{flex:1}}>
        <TopMess/>
      </View>
      <View style= {{flex:5}}>
        <Slider/>
      </View>
      <View style= {{flex:2, alignItems: 'center'}}>
        <Text style={{color:'white', fontSize: 20}}>{usernname}歡迎回來</Text>
        <Text></Text>
        <TouchableOpacity style={ styles.container1 } onPress={() => navigation.push('planet')} >
          <Image source={require('./assets/mine2.png')} style={styles.imgiconstyle_mine}/>
        </TouchableOpacity>
      </View>
      <View style= {{flex:6}}>
        <View style={ styles.contain}>
          <TouchableOpacity style={ styles.container2 } onPress={() => navigation.push('DrawCard')} >
            <Image source={require('./assets/lottery-game.png')} style={styles.imgiconstyle}/>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.container1 } onPress={() => navigation.push('SpecialEffects')} >
            <Image source={require('./assets/photo-camera.png')} style={styles.imgiconstyle}/>
          </TouchableOpacity>
        </View>
        <View style={ styles.contain}>
          <TouchableOpacity style={ styles.container1 } onPress={() => navigation.push('FaceGame')} >
            <Image source={require('./assets/shuttle.png')} style={styles.imgiconstyle}/>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.container2 } onPress={() => navigation.push('socket')} >
            <Image source={require('./assets/map.png')} style={styles.imgiconstyle}/>
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

  export const planet =({ navigation }) => {
    return(
      <ScreenContainer>
          <MyPlanet/>
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
  
  export const socket =({ navigation }) => {
    return(
      <ScreenContainer>
          <Socketmap/>
      </ScreenContainer>
    );
  };
  
  
  export const map =({ navigation }) => {
    return(
      <ScreenContainer>
          <MessMap/>
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

  export const Document_go =({ navigation }) => {
    return(
      <ScreenContainer>
        <GoTo/>
      </ScreenContainer>
    );
  };

  export const Result_go =({ navigation }) => {
    return(
      <ScreenContainer>
        <GoHome/>
      </ScreenContainer>
    );
  };


  const ScreenContainer = ({ children }) => (
    <View style={{flex: 1}}><ImageBackground source={image} style={styles.image1}>{children}</ImageBackground></View>
  );
  