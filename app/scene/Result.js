import firebase from '../config';
import React from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, ImageBackground, Dimensions, Image } from 'react-native';
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
              //data: [0.8,0.5,0.22,0.4,0.3],
              user_name:""
          }
      }  
  
      componentDidMount = () => {
  
        //console.log('STARTTTTT');
       
        this.get_data();
    
      }
    
      get_data() { //取得使用者名稱
  
        this.setState({user_name : ""});
    
        var user = firebase.auth().currentUser;
      //  if (user != null) { this.setState({email: user.email , uid: user.uid}) };
        var firebaseRef =  firebase.database().ref('/users/' + user.uid + '/username');
    
        firebaseRef.on('value', snapshot => {
          this.setState({
            user_name : snapshot.val()
          })
          console.log('firebase',snapshot.val());
         }); 
    
        console.log('user', this.state.user_name);
  
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
  
          var img_uri = require('../assets/agree.png');
          var description = <Text>◆ 外向星人{"\n"} 性格活潑、善於交際的外向星人，喜歡與其他宇宙居民交流。</Text>;
  
          if(global.result === "外向星人")
          {
             img_uri = require('../assets/agree.png');
             description = <Text>◆ 外向星人 ◆{"\n"} 性格活潑、善於交際的外向星人，喜歡與其他宇宙居民交流。</Text>
            
          }
          else if(global.result === "親和星人")
          {
             img_uri = require('../assets/agree.png'); 
             description = <Text>◆ 親和星人 ◆{"\n"} 和善、信任他人的親和星人，經常傾聽其他宇宙居民的煩心事以及開導想不開的居民。</Text>
          }
          else if(global.result === "盡責星人")
          {
              img_uri = require('../assets/res.png');
              description =  <Text>◆ 盡責星人 ◆{"\n"} 認真負責、勤奮且思慮周全的盡責星人，經常抱著記錄工作內容的備忘錄。</Text>
          }
          else if(global.result === "穩穩星人")
          {
              img_uri = require('../assets/neu.png');
              description =  <Text>◆ 穩穩星人 ◆{"\n"} 情緒起伏不定、容易緊張的穩穩星人，因為缺乏安全感，所以天天蓋著棉被，需要很多溫暖的陪伴。</Text>
          }
          else if(global.result === "開放星人")
          {
              img_uri = require('../assets/open.png');
              description = <Text>◆ 開放星人 ◆{"\n"} 熱愛冒險、心胸寬大的開放星人，喜歡開著自己的車子到處旅行，尋找宇宙中的寶藏。</Text>
          } 
  
  
          return(
            
          <View style={{ alignItems:'center', justifyContent:'center' }}>
            <ImageBackground source={require('../assets/background.jpg')} style={{resizeMode:'contain' }}>
  
           <View style={{flex:3}}>
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
                 margin:15,
             }}
           />
           </View>
  
            <Text style={{color:'white' ,  fontSize:25 , fontWeight:'bold', marginLeft:screenWidth*0.13 , padding:10}}>{this.state.user_name}你好，你是{global.result}!</Text>
  
            <View style={{flexDirection:'row' , alignItems:'center',backgroundColor:'#395391' , flex:3 , borderRadius:10 , margin:5}}>
              <Image style={{backgroundColor:'#685691' , paddingTop:30, borderRadius:30 ,width:screenWidth*0.6, resizeMode:'cover', height:250 , margin:5,flex:1.2}} 
                     source={img_uri}></Image>
              <Text style={{color:'white' ,  fontSize:16 , fontWeight:'bold' , margin:5 , flex:1 ,marginBottom:30}}>{description}</Text>
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
        <View style={{alignItems:'center', justifyContent:'center' , flex:5}}>
          <Result/>
        </View>
        <View style={{alignItems:'center', justifyContent:'center' , flex:1}}>
           <TouchableOpacity style={{backgroundColor:'#C12D63', padding:10 ,marginLeft:screenWidth*0.36 } } onPress={()=> navigation.push('ImageBtn')}>
                <Text style={{fontSize:18,color:'white'}}>★ 進入Face Planet→</Text>
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