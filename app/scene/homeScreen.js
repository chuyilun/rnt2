import React from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from '../config';

import { TouchableOpacity } from "react-native-gesture-handler";
import { UserInterfaceIdiom } from "expo-constants";
import { ThemeProvider } from "@react-navigation/native";

 export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       email: "",
       name: "",
       user: "",
       uid: ""
    }
  }
 
  componentDIdMount = () => {

    //console.log('STARTTTTT');

    this.setState({user : ""});
    this.get_data();

  }

  get_data() { //取得使用者名稱

    var user = firebase.auth().currentUser;
    if (user != null) { this.setState({email: user.email , uid: user.uid}) };
    var firebaseRef =  firebase.database().ref('/users/' + user.uid + '/username');

    firebaseRef.on('value', snapshot => {
      this.setState({
        user : snapshot.val()
      })
      //console.log('firebase',snapshot.val);
     });

    //console.log('user', this.state.user);
 
  }


  signOutUser = () => { //登出
    firebase.auth().signOut();
  };


  render() {
    return (
      <View style={styles.container}>
        <Text>Hi {this.state.user}!</Text>

        <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});