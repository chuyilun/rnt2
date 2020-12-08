import firebase from '../config';
import React from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
      LineChart
  } from 'react-native-chart-kit'



let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let dialogWidth = screenWidth-80;

const user = firebase.auth().currentUser;


  class Result extends React.Component {

    constructor(props){
        super(props);
        this.state={
            result:null,
            data: [global.big_extra,global.big_agree,global.big_cons,global.big_emo,global.big_open],
            user:""
        }
    }  

    componentDidMount = () => {

      //console.log('STARTTTTT');
  
      this.setState({user : ""});
      this.get_data();
  
    }
  
    get_data() { //取得使用者名稱
  
      var user = firebase.auth().currentUser;
    //  if (user != null) { this.setState({email: user.email , uid: user.uid}) };
      var firebaseRef =  firebase.database().ref('/users/' + user.uid + '/username');
  
      firebaseRef.on('value', snapshot => {
        this.setState({
          user : snapshot.val()
        })
        console.log('firebase',snapshot.val);
       }); 
  
      console.log('user', this.state.user);

      firebase.auth().onAuthStateChanged((user) => { //使用者狀態
        if (user) {
          // User logged in already or has just logged in.
          console.log(user.uid);
          firebase //加進realtimeDB
            .database().ref('users/'+user.uid+'/').update({
              type: global.result
            });
        } else {
          // User not logged in or has just logged out.
        }
      });
      
   
    }
  
    

    render (){
        return(
          
        <View style={{flex:3 , alignItems:'center', justifyContent:'center'}}>
          <ImageBackground source={require('../assets/background.jpg')} style={{resizeMode:'contain'}}>


          <LineChart
           data={
             {
              labels: ["外向", "親和", "盡責", "沉穩", "開放"],
              datasets: [
                {
                  data: this.state.data
                }
              ],
              legend: ["五大性格分析"] // optional
             }
           }
           width={screenWidth}
           height={220}
           chartConfig={{
            backgroundGradientFrom: "#2B4161",
            backgroundGradientTo: "#2B4161",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
              }
           }
           style={{
               borderRadius:16,
               margin:15
           }}
         />

          <View style={{alignItems:'center', justifyContent:'center' , flex:1}}>
              <Text　style={{color:'white', fontSize:24 , fontWeight:'bold'}}>{this.state.user}你好: 你是{global.result}！</Text>
          </View>
          
          </ImageBackground>
          
          <View>
         
        </View>
            
       


        </View>
    
    
        );
      }

}

export default function GoHome() {

  const navigation  =  useNavigation();

  return (
    <View style={{alignItems:'center', justifyContent:'center' , flex:1} }>
      <View style={{alignItems:'center', justifyContent:'center' , flex:1}}>
        <Result/>
      </View>
      <View style={{alignItems:'center', justifyContent:'center' , flex:1}}>
         <TouchableOpacity style={{backgroundColor:'gray', padding:10 , marginTop:screenHeight*0.3, marginLeft:screenWidth*0.3 } } onPress={()=> navigation.push('ImageBtn')}>
              <Text style={{fontSize:20,color:'white'}}>★ 進入Face Planet→</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
  
 }


const styles = StyleSheet.create({
    buttonRow: {
      flexDirection: 'row'
    },
    chartRow: {
      flex: 1,
      width: '100%'
    },
    container: {
      paddingTop: 30,
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });