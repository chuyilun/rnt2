
import firebase from '../config';
import React, { useState,Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';



let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let dialogWidth = screenWidth-80;



 class Document extends React.Component {


  constructor(props)
  {
    super(props);
    this.state={
       v_result:null,
       platform:'android',
       form_data:null,
       v_name:'',
       response_result : null,
       analyze:'',
       b_extra:null,
       b_agree:null,
       b_cons:null,
       b_emo:null,
       b_open:null,
       user:"",
      
    }
    global.result = null;
    global.big_extra = null;
    global.big_agree = null;
    global.big_cons = null;
    global.big_emo = null;
    global.big_open = null;
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
 
  }

  document_pick= async () => {

   if(Platform.OS === 'android'){
    let result = await DocumentPicker.getDocumentAsync({type:'video/*'});
    this.setState({v_result:result , v_name:result.name})
    console.log(this.state.v_result);
    //aazz = this.state.v_result;

    let formData = new FormData();
    formData.append("videoFile", {
      name: result.name,
      uri: result.uri,
      type: 'video/mp4'
    });

    this.setState({form_data:formData});
   
    console.log(this.state.form_data);

   }
   else if(Platform.OS === 'ios')
   {

   }
     
  };

  getFetch=()=>{

    console.log(this.state.form_data)

   let options = {
      method: "POST",
      body: this.state.form_data,
      headers: {
        Accept: "application/json",
                "Content-Type": "multipart/form-data"
      }
    };

    
   if(this.state.v_result != null){


    if(Platform.OS === 'android')
       this.setState({platform:'android'})
    if(Platform.OS === 'ios')
       this.setState({platform:'ios'})
       

    fetch('http://4669e877b915.ngrok.io/docu', options).then(response =>
      response.json().then(data => {
        console.log("success fetch :",data);
        console.log("外向性 :",data.extra);
        console.log("親和性 :",data.agree);
        console.log("盡責性 :",data.cons);
        console.log("沉穩性 :",data.emo);
        console.log("開放性 :",data.open);
        console.log("最大值 :",data.max);

        this.setState({response_result:data.tasks , b_extra:data.extra, 
                       b_agree:data.agree, b_cons:data.cons, b_emo:data.emo, b_open:data.open});
        this.sendResult();

      })
    );
    
    }
    else{
      alert("請先上傳自我介紹影片喔!");
    }

  };

  sendResult = () =>{


    global.result= this.state.response_result;
    global.big_extra = this.state.b_extra;
    global.big_agree = this.state.b_agree;
    global.big_cons = this.state.b_cons;
    global.big_emo = this.state.b_emo;
    global.big_open = this.state.b_open;
    console.log(global.result);
    console.log(global.big_extra);
    console.log(global.big_agree);
    console.log(global.big_cons);
    console.log(global.big_emo);
    console.log(global.big_open);

    
    if(global.result && global.big_open){
        alert("分析完成");
        this.setState({analyze:'分析完成'})
    }

  }

  render (){
    return(

      <ImageBackground source={require('../assets/background.jpg')} style={{resizeMode:'cover'}}>

      <View style={{alignItems:'center', justifyContent:'center'}}>
          <Text　style={{color:'white', fontSize:24 , fontWeight:'bold'}}>{this.state.user}你好，請上傳一部</Text>
          <Text　style={{color:'white', fontSize:22 , fontWeight:'bold'}}>你的自我介紹影片(大約15秒)</Text>
          <Text style={{color:'white', fontSize:15 , margin:5}}>Face Planet將會判斷你屬於哪一類型的宇宙居民</Text>
          <Text style={{color:'white', fontSize:15 ,margin:5}}>並賦予你一顆專屬的星球！</Text>
          <TouchableOpacity style={{backgroundColor:'gray', padding:10,margin:20 }} onPress={this.document_pick}>
             <Text style={{color:'white'}}>選擇影片!</Text>
          </TouchableOpacity>
          <Text style={{color:'white', fontSize:15 }}>{this.state.v_name}</Text>
          <TouchableOpacity style={{backgroundColor:'gray', padding:10, margin:20}} onPress={this.getFetch}>
             <Text style={{color:'white'}}>開始分析！</Text>
          </TouchableOpacity>
          <Text style={{color:'white', fontSize:15 }}>{this.state.analyze}</Text>
      </View>
      </ImageBackground>

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



 export default function GoTo() {

  const navigation  =  useNavigation();

  return (
    <View style={{alignItems:'center', justifyContent:'center'}}>
      <View>
        <Document/>
      </View>
      <View style={{alignItems:'center', justifyContent:'center' , flex:1}}>
        <TouchableOpacity style={{backgroundColor:'gray', padding:20 , marginTop:screenHeight*0.3, marginLeft:screenWidth*0.3 ,
                                  alignItem:'center', justifyContent:'center'}} onPress={ () => {if(global.result)
                                                                                                    navigation.push('Result_go')}}>
           <Text style={{color:'white', fontSize:20}}>查看我的宇宙居民</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  
 }

// export const Result_goto =({ navigation }) => {
//   return(
//     <ScreenContainer>
//       <Result/>
//     </ScreenContainer>
//   );
// };


// const ScreenContainer = ({ children }) => (
//   <View style={{flex: 1}}>{children}</View>
// );