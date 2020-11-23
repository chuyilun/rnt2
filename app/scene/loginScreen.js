import React from "react";
import {View,Text,StyleSheet,TextInput,ImageBackground} from "react-native";
import { Input } from 'react-native-elements';

const image =  require('.././assets/starsky.jpg') ;

export default class LoginScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      email: "",
      Password: "",
      errorMessage: null
    }
    global.gemail = null;
    global.gpassword = null;
  }

  

  render() {
    return(
  <View style={StyleSheet.container}>
    <ImageBackground source={image} style={styles.image}>
          <Text style={styles.greeting}>{'Hello again.\nWelcome back.'}</Text>
      <View style={styles.errorMessage}>
         {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
      </View>
     
     <View style={styles.form}>
         <View>
            <Input 
            placeholder='Email Address'
            autoCapitalize="none"
            onChangeText={(email) => { this.setState({email:email})
                                       gemail = email}}
            value={this.state.email}
            style={{color:'white'}}
            ></Input>
         </View>

     <View style={{marginTop: 32}}>
       <Input Password
       placeholder='Password'
       secureTextEntry 
       autoCapitalize="none" 
       onChangeText={(password) => {this.setState({password})
                                    gpassword = password}}
       value={this.state.password}
       style={{color:'white'}}
       ></Input>
     </View>
   </View>
       
      
    </ImageBackground>
   </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight:"400",
    textAlign:"center",
    color:'#fff'  
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent:"center",
    marginHorizontal: 30
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight:"600",
    textAlign: "center"
  },

  form:{
    marginBottom: 48,
    marginHorizontal: 30
  },
  inputTitle:{
    color: "#8A8F9E",
    fontSize: 10,
    textTransform:"uppercase"
  },
  input: {
    borderBottomColor:"#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent:"center"
  }



});