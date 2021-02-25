import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Input } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from '../config';
// import { useNavigation } from '@react-navigation/native';
//config檔要記得加!!

export default class RegisterScreen extends React.Component {

  state = {
    name: "",
    email: "",
    Password: "",
    errorMessage: null,
    high_score:0,
    coin:100,
    type:"盡責星人"
  }

  handleSignup = () => { //註冊
    // const navigation  =  useNavigation();

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name
        });
      })
      .catch(error => this.setState({ errorMessage: error.message }));
    firebase.auth().onAuthStateChanged((user) => { //使用者狀態
      if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
        firebase //加進realtimeDB
          .database().ref('users/').child(user.uid).set({
            uid: user.uid,
            username: this.state.name,
            pd: this.state.password,
            email: this.state.email,
            high_score:this.state. high_score,
            coin:this.state.coin,
            type:"盡責星人"
          });
          // navigation.push('ImageBtn')
      } else {
        // User not logged in or has just logged out.
      }
    });

  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>{'Hello !\nSign up to get started.'}</Text>


        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
          <View>
            <Input
              style ={{color:'white'}}
              placeholder='Full Name'
              autoCapitalize="none"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            ></Input>
          </View>

          <View style={{ marginTop: 32 }}>
            <Input
              style ={{color:'white'}}
              placeholder='Email Address'
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            ></Input>
          </View>

          <View style={{ marginTop: 32 }}>
            <Input
              style ={{color:'white'}}
              placeholder='Password'
              secureTextEntry
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            ></Input>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
        </TouchableOpacity>

      </View>
    );
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    color:'white'
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },

  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D"
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  }


});