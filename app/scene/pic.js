import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ImageBackground, Dimensions, TouchableNativeFeedback } from 'react-native';
import { UIManager, PermissionsAndroid, Platform, ScrollView, TextInput , TouchableHighlight, ActivityIndicator} from 'react-native';
import Carousel from 'react-native-snap-carousel';
//import { WebView} from 'react-native-webview';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import PageScrollView from 'react-native-page-scrollview';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import Modal from 'react-native-modal';

import { render } from 'react-dom';

let screenWidth = Dimensions.get('window').width;
let dialogWidth = screenWidth-80;

export default class Pic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      image_64 : null,
      fetch_img_64 : null,
      status : 'Welcome',
      choice : null,
      w: Dimensions.get('window').width,
      h: Dimensions.get('window').height,
      style_img: 'wave',
      activeIndex:0,
      ModalVisible:true,
      LoadingVisible:true,
      platform:'ios',
      current_img: 'wave',
      carouselItems: [
      {
          title:'Wave',
          text:'wave',
          url:  require('../assets/wave.jpg'),
      },
      {
          title:"Wreck",
          text:'wreck',
          url:  require('../assets/wreck.jpg'),
      },
      {
          title:"Scream",
          text:'scream',
          url:  require('../assets/scream.jpg'),
      },
      {
        title:"Udnie",
        text:'udnie',
        url:  require('../assets/udnie.jpg'),
      },
      {
        title:"La muse",
        text:'la_muse',
        url:  require('../assets/la_muse.jpg'),
      },
      {
        title:"Rain Princess",
        text:'rain_princess',
        url:  require('../assets/rain_princess.jpg'),
      },
    ],
      photo_uri: null,
      isRefreshing: false
    };
  }

  getFetch2=()=>{

    console.log(this.state.style_img);


   if(this.state.image_64 != null){

    this.Loading(true);

    if(Platform.OS === 'android')
       this.setState({platform:'android'})
    if(Platform.OS === 'ios')
       this.setState({platform:'ios'})
       
/////////////////////改這裡
    fetch('http://16786052cf4a.ngrok.io/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fetch_img_64: this.state.image_64,
        user_choice: this.state.choice,
        platform_use: this.state.platform,
        style_img: this.state.style_img
      })
    }).then(response =>
      response.json().then(data => {
        console.log("success fetch :",data);
        this.setState({image: data.result_img , status: 'Welcome!'});
        this.Loading(false);

      })
    );
    }
    else{
      alert("Please select a picture or shoot!");
    }

  };
 
  
  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri, base64 } = await ImagePicker.launchImageLibraryAsync({
       aspect: [3, 4],
       allowsEditing: true,
       base64: true,
    });
    if (!cancelled) this.setState({ image: uri , image_64: base64, choice: 'album' ,ModalVisible:false });
    console.log("image uri from phone:",this.state.image);
   // console.log("image uri base64 from phone:",this.state.image_64);
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      aspect: [9, 9],
      allowsEditing: false,
      base64: true,
    });
    if(!cancelled) this.setState({ image: uri , image_64: base64 , choice: 'camera', ModalVisible:false });
    console.log("image uri from camera:",this.state.image);
  };

  _downloadFile = async () => {

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);

     //permission for camera_roll
    if (status === "granted") {

       //store the cached file

       let gifDir = null;

       if(Platform.OS === 'android')
          gifDir = FileSystem.cacheDirectory;  //Directory: Android用 cacheDirectory 
       else if(Platform.OS === 'ios')    
          gifDir = FileSystem.documentDirectory; //iOS用 documentDirectory

       const dirInfo = await FileSystem.getInfoAsync(gifDir);
       if (!dirInfo.exists) {
         try{
         console.log('download directory doesn\'t exist, creating...');
         await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
         } catch(e) {
           const Info = await FileSystem.getInfoAsync(gifDir);
           console.log("ERROR",e,Info);
         }
       } 
       
       console.log('INNNNN',gifDir,dirInfo);
    
       const file = await FileSystem.downloadAsync(this.state.image , gifDir+'photo.jpg');

       console.log('Filedownloaded!!', file);
       alert('已儲存相片!');

       //save the image in the galery using the link of the cached file
       const assetLink = await MediaLibrary.createAssetAsync(file.uri);
      // await MediaLibrary.createAlbumAsync('Planet', assetLink);
       alert('已儲存至',assetLink);
      
       console.log('done!');

    }
    else{
      console.log('No Permission');
    }
  };

  //<Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,'+this.state.image_64}} />

  _onPressCarousel =()=> {

    var img_index = this.state.carouselItems[this.carousel.currentIndex].text;

    setTimeout(()=>{
      this.setState({style_img: img_index});
    },0);

    console.log('style2:',this.state.style_img);

  }

  _renderItem=({item,index})=>{

    return (

      <View  style={{
        paddingTop:'5%',
        paddingBottom:'5%',
        borderRadius: 5,
        backgroundColor:'white',
        alignItems:'center',}}>
      <View style={{ width: 190 , borderStyle:'solid' , borderColor:'gray',
                     borderWidth:2 , borderRadius: 15 , alignItems:'center', justifyContent:'center'}}>
       <TouchableOpacity style={{backgroundColor:'white'}} onPress={this._onPressCarousel} >
        <Image source={item.url} style={{
          borderRadius: 15,
          width: 180,
          flex:1,
          backgroundColor:'white'
        }}></Image>
       </TouchableOpacity>
        <Text style={{fontSize: 13 , fontWeight:'bold',flex:1}}>{item.title}</Text>
       </View>       
      </View>

    )
  }

  setModalVisible(visible){
    this.setState({ModalVisible:visible});
  }
  
  Loading (Visible){

      if(Visible === true)
      {
          return(
              <View style={{alignItems:'center', padding:15}}> 
                   <ActivityIndicator />
                   <Text>Loading...</Text>
              </View>
           );
      }
      else
      {
        return(<View/>);
      }

      
    
  }

  render() {
    return (
     <View style={Styles.container}>
    <ImageBackground source={require('../assets/background.jpg')} style={{flex: 4}}>
     <View style={{flex:1}}>
      <View style={Styles.row}>
      <TouchableOpacity style={{alignItems:'center'}} onPress={()=> this.setModalVisible(true)}>
          <Image source={require('../assets/choice.png')} style={{width:110,resizeMode:'contain'}}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems:'center',marginLeft:'45%'}} onPress={this._downloadFile}>
          <Image source={require('../assets/save.png')} style={{width:110,resizeMode:'contain'}}></Image>
      </TouchableOpacity>
      </View>
    </View>
        <Modal isVisible={this.state.ModalVisible} animationType={'fade'}>
         
          <View style={{backgroundColor:'#47517d',borderRadius:10,alignItems:'center'}}>
            <View style={{padding: 13,margin: 25, backgroundColor:'#fa6898', height:50, width:this.state.w*0.9, alignItems:'center'}}>
              <Text style={{alignItems:'center',fontSize:20 ,color: 'white',fontWeight:'bold'}}>選擇開啟相簿或直接拍照！</Text>
            </View>
            <TouchableOpacity style={{alignItems:'center',borderRadius:10}} onPress={this.selectPicture}>
               <Image source={require('../assets/gallery.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems:'center',borderRadius:10}} onPress={this.takePicture}>
               <Image source={require('../assets/camera.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 13,margin: 15, alignItems:'center'}} onPress={()=> this.setModalVisible(false)}>
               <Text style={{paddingLeft:'85%',color:'white',fontSize:16}}>離開</Text>
            </TouchableOpacity>
          </View>
          
        </Modal>
      
       <View style={{alignItems: 'center',justifyContent: 'center' , flex:4}}>
        <View style={{width: this.state.w*0.77, borderWidth:4 , borderColor:'#F3B9C8',flex:1}}>
        <Image style={{width: this.state.w*0.75 ,  backgroundColor: 'white',flex:1}} source={{ uri: this.state.image}} />
        </View>
        <View style={Styles.row}>
          <TouchableOpacity style={{}} onPress= {this.getFetch2} >
             <Image source={require('../assets/transfer.png')} style={{paddingTop:5}}></Image>
          </TouchableOpacity> 
        </View>   
       </View>
      
      </ImageBackground>

      <View style={{backgroundColor:'white',flex:1 }}>

       <View style={{ flexDirection:'row', justifyContent: 'center', alignItems:'center'}}> 
         <Carousel
            layout={"default"}
            loop = {true}
            inactiveSlideOpacity={0.5}
            ref={ref => this.carousel = ref}
            data={this.state.carouselItems}
            sliderWidth={250}
            itemWidth={250}
            renderItem={this._renderItem}
            onSnapToItem = { (index)=>{this.setState({activeIndex:index, current_img: this.state.carouselItems[this.carousel.currentIndex].title })} } />
       </View> 
      </View>
    </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
})