import React, { Component, useEffect, useRef } from 'react';
import * as Permissions from 'expo-permissions';
import { Dimensions, StyleSheet, Text, View, TextInput, FlatList, Animated, ScrollView, TouchableOpacity, Image, Platform, Alert, UIManager, LayoutAnimation, Button } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
// import { useNavigation } from '@react-navigation/native';

import firebase from '../config';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import { TouchableOpacity } from "react-native-gesture-handler";
import ScrollTopView from 'react-native-scrolltotop';
import SlidingPanel from 'react-native-sliding-up-down-panels';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 300;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
let mapIndex = 0;
let mapAnimation = new Animated.Value(0);


const Images = [
    { image: require("../assets/manage.jpg") },
    { image: require("../assets/F1.jpg") },
    { image: require("../assets/gas.jpg") },
    { image: require("../assets/F2.jpg") },
    { image: require("../assets/coffee.jpg") },
  ];
  const Images_uri = [
     require("../assets/manage.jpg") ,
     require("../assets/F1.jpg") ,
     require("../assets/gas.jpg") ,
     require("../assets/F2.jpg") ,
     require("../assets/coffee.jpg") ,
  ];
  
  const Images2 = [
    { image: require("../assets/image1.png") },
    { image: require("../assets/image2.png") }
  ];
  
  const firebase_con = () =>{
  
    var firebaseRef = firebase.database().ref('/markers/');
    console.log(firebaseRef);
    firebaseRef.on('child_added', snapshot => {
  
      console.log('firebase2_con', snapshot.val().coordinate);
      console.log('firebase2_con', snapshot.val().description);
      console.log('firebase2_con', snapshot.val().image);
      console.log('firebase2', snapshot.val().textimage);
      console.log('firebase2', snapshot.val().textimage2);
      console.log('firebase2', snapshot.val().title);
  
    });
  
  }
  
  const markers_2 = [
    {
      coordinate: {
        latitude: 25.034958316223577,
        longitude: 121.38934733979367,
      },
      title: "管理大樓",
      description: "",
      image: Images[0].image,
      textimage: Images2[0].image,
      textimage2: Images2[1].image,
      rating: 4,
      reviews: 99,
    },
  
  
  
    {
      coordinate: {
        latitude: 25.034030695440066,
        longitude: 121.38952213558267,
      },
      title: "醫學大樓",
      description:
        <Text style={{ margin: 5 }}>
          阿群:讚?{"\n"}
        {/* 阿睿:這棟樓好多實驗室{"\n"}
        阿姍:這裡的沙發好舒服喔~{"\n"}
        阿培:這邊的冷氣好冷{"\n"}
        阿綸:電梯很慢{"\n"}
        阿雯:今天沒開QQ{"\n"} */}
        </Text>,
  
      textimage: Images2[0].image,
      textimage2: Images2[1].image,
      image: Images[1].image,
      rating: 5,
      reviews: 102,
    },
  
  
  
    {
      coordinate: {
        latitude: 25.0346930847256,
        longitude: 121.38819747764435
      },
      title: "文物館",
      description: "你好",
      image: Images[2].image,
      rating: 3,
      reviews: 220,
    },
    {
      coordinate: {
        latitude: 25.03507557203697,
        longitude: 121.387530379581,
      },
      title: "第二醫學大樓",
      description: "安安",
      image: Images[3].image,
      rating: 4,
      reviews: 48,
    },
    {
      coordinate: {
        latitude: 25.03527862037391,
        longitude: 121.38886457570432
      },
      title: "伯朗咖啡館",
      description: "",
      image: Images[4].image,
      rating: 4,
      reviews: 178,
    },
  ];

  export default class Result extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
      user: "",
      uid: "",
      message: [],
      mess: "",
      markers: markers_2,
      region: {
        latitude: 25.03404019627408,
        longitude: 121.38913339813554,
        latitudeDelta: 0.004864195044303443,
        longitudeDelta: 0.0040142817690068,
      },
      categories: [
        { 
          name: '穩穩星人常出沒的地方', 
          icon: <Ionicons style={styles.chipsIcon} name="ios-rocket" size={18} />,
        },
        {
          name: '親和星人的休息站',
          icon: <Ionicons name="ios-cafe" style={styles.chipsIcon} size={18} />,
        },
        {
          name: '開放星人的遊樂場',
          icon: <Ionicons name="ios-baseball" style={styles.chipsIcon} size={18} />,
        },
        {
          name: '盡責星人的辦公室',
          icon: <Ionicons name="ios-briefcase" style={styles.chipsIcon} size={18} />,
        },
        {
          name: '外向星人的聊天室',
          icon: <Ionicons name="ios-contacts" style={styles.chipsIcon} size={18} />,
        },
    ],
      location: null,
      expanded: false,
      data_Marker: [],
      // review: '',

    }
  //  global.dataBlog = [];
    // handlereview = (text) => {this.setState({ review: text }) }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  }
  
  state = {
     markers_2,

  }


  // state = {
  //   latitude: null,
  //   longitude: null
  // }



  useEffect = () => {
    const _map = React.useRef(null);

    // var data = this.state.data_Marker;
    // console.log("in use effect:>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    // console.log("Data:",this.state.data_Marker);

    this.get_data();


    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.data_Marker.length) {
        index = this.state.data_Marker.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state.markers_2[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  };

  interpolations = markers_2.map((marker, index) => {

    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  onMarkerPress = (mapEventData) => {
    const _scrollView = React.useRef(null);

    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  }

  pushFire = (index) => {
    console.log(index);

    this.setState({mess:""});

    var firebaseRef = firebase.database().ref('/markers/');
    console.log(firebaseRef);
    firebaseRef.on('child_added', snapshot => {
      console.log('firebase2_con', snapshot.val().coordinate);
      console.log('firebase2_con', snapshot.val().description);
      console.log('firebase2_con', snapshot.val().image);



      if (snapshot.val().description.uid3.message === "") {
        firebase.database().ref('/markers/location' + index + '/description/uid3').set({
          username: "阿宏",
          image: "https://i.imgur.com/PTFGPRc.png",
          message: this.state.mess,
        })
      }

      else if (snapshot.val().description.uid4.message === "") {
        firebase.database().ref('/markers/location' + index + '/description/uid4').set({
          username: "培培4",
          image: "https://i.imgur.com/PTFGPRc.png",
          message: this.state.mess,
        })
      }
      else if (snapshot.val().description.uid5.message === "") {
        firebase.database().ref('/markers/location' + index + '/description/uid5').set({
          username: "培培5",
          image: "https://i.imgur.com/PTFGPRc.png",
          message: this.state.mess,
        })
      }
    console.log("firebase1", this.state.mess);

    this.componentDidMount();
    });
  }



  get_data = () => {
    // var user = firebase.auth().currentUser;

    var firebaseRef = firebase.database().ref('/markers/');
    console.log(firebaseRef);
    firebaseRef.on('child_added', snapshot => {

      console.log('firebase2', snapshot.val().coordinate);
      console.log('firebase2', snapshot.val().description);
      console.log('firebase2', snapshot.val().image);
      console.log('firebase2', snapshot.val().textimage);
      console.log('firebase2', snapshot.val().textimage2);
      console.log('firebase2', snapshot.val().title);

      this.setState(prevState => ({
        message: [...prevState.message, [[snapshot.val().coordinate.latitude, snapshot.val().coordinate.longitude],
        [[snapshot.val().description.uid1.image,snapshot.val().description.uid1.message,snapshot.val().description.uid1.username],
        [snapshot.val().description.uid2.image,snapshot.val().description.uid2.message,snapshot.val().description.uid2.username],
          [snapshot.val().description.uid3.image,snapshot.val().description.uid3.message,snapshot.val().description.uid3.username],
          [snapshot.val().description.uid4.image,snapshot.val().description.uid4.message,snapshot.val().description.uid4.username],
          [snapshot.val().description.uid5.image,snapshot.val().description.uid5.message,snapshot.val().description.uid5.username]]
          , snapshot.val().image,[[snapshot.val().person.fifth.percent,snapshot.val().person.fifth.r_img],
          [snapshot.val().person.fourth.percent,snapshot.val().person.fourth.r_img],
          [snapshot.val().person.max.percent,snapshot.val().person.max.r_img],
          [snapshot.val().person.second.percent,snapshot.val().person.second.r_img],
          [snapshot.val().person.third.percent,snapshot.val().person.third.r_img]], snapshot.val().textimage, snapshot.val().textimage2, snapshot.val().title, 
          


        ]]

      }))
    }).bind(this);

    console.log("message", this.state.message);

    this.arr_data();



  }

  arr_data = () => {

    let datalist = this.state.message;
    let dataBlog = [];

    datalist.map((item) => {
      dataBlog.push({
        coordinate: {
          latitude: item[0][0],
          longitude: item[0][1]
        },
        description: {
          uid1:{        
            image:item[1][0][0],
            message:item[1][0][1],
            username:item[1][0][2],
          },
          uid1:{        
            image:item[1][0][0],
            message:item[1][0][1],
            username:item[1][0][2],
          },
          uid2:{        
            image:item[1][1][0],
            message:item[1][1][1],
            username:item[1][1][2],
          },
          uid3:{        
            image:item[1][2][0],
            message:item[1][2][1],
            username:item[1][2][2],
          },
          uid4:{        
            image:item[1][3][0],
            message:item[1][3][1],
            username:item[1][3][2],
          },
          uid5: {
            image: item[1][4][0],
            message: item[1][4][1],
            username: item[1][4][2],
          },
        },
        image: item[2],
        textimage: item[4],
        textimage2: item[5],
        title:item[6],
        person:{
          max:{
            percent:item[3][2][0],
            r_img:item[3][2][1],
          },          
          second:{
            percent:item[3][3][0],
            r_img:item[3][3][1],
          },          
          third:{
            percent:item[3][4][0],
            r_img:item[3][4][1],
          },          
          fourth:{
            percent:item[3][1][0],
            r_img:item[3][1][1],
          },          
          fifth:{
            percent:item[3][0][0],
            r_img:item[3][0][1],
          },

        }

      })
    });

    console.log("arr_data",dataBlog);

    this.setState({data_Marker:dataBlog});

    console.log("data_Marker:" , this.state.data_Marker);
    
  }


//    componentWillMount() {
//     this.setState({ message: [], data_Marker: [] });

// //    // this.get_data();

// // //    this.arr_data();
//    }


  async componentDidMount() {
    // this.arr_data();

    this.setState({ message: [], data_Marker: [] , mess:"" });

    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, () => console.log('State:', this.state)),
      (error) => console.log('Error:', error)
    )  

    // this.setState({ message: [], data_Marker: [] });
    
    this.get_data();

    // const upTime = () =>{
    //   //這裡面的setState()能夠重新設定state的值
    //   this.get_data();
    //  }
    // setInterval(upTime,1000000)

  }


  render() {
    const { latitude, longitude } = this.state

    if (latitude) {
      return (
        <View style={styles.container}>
          <MapView
            ref={(ref) => this._map = ref}
            showsUserLocation
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={this.state.region}
          >
            {markers_2.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: this.interpolations[index].scale,
                  },
                ],
              };
              return (
                <MapView.Marker key={index} coordinate={marker.coordinate}>
                  <Animated.View style={[styles.markerWrap]}>
                    <Animated.Image
                      source={require('../assets/map_marker.png')}
                      style={[styles.marker, scaleStyle]}
                      resizeMode="cover"
                    />
                  </Animated.View>
                </MapView.Marker>
              );
            })}
          </MapView>
          <View style={styles.searchBox}>

        <TextInput 
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex:1,padding:0}}
        />
        <Ionicons name="ios-search" size={20} />
         </View>
           
          <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            height={50}
            style={styles.chipsScrollView}
            contentInset={{ // iOS only
              top: 0,
              left: 0,
              bottom: 0,
              right: 20
            }}
            contentContainerStyle={{
              paddingRight: Platform.OS === 'android' ? 20 : 0
            }}
          >

           {this.state.categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
         ))}


          </ScrollView>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false} //資訊欄滾輪軸
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
            style={styles.scrollView}
            contentInset={{
              top: 0,
              left: SPACING_FOR_CARD_INSET,
              bottom: 0,
              right: SPACING_FOR_CARD_INSET
            }}
            contentContainerStyle={{
              paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: mapAnimation,
                    }
                  },
                },
              ],
              { useNativeDriver: true }
            )}
          >
            {this.state.data_Marker.map((marker, index) => (

              <View style={styles.card} key={index}>
                <Image
                  source= {Images_uri[index]}
                  style={styles.cardImage}
                  resizeMode="cover"  //調整資訊欄中的圖
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                  {/* <Text numberOfLines={1} style={styles.cardtitle}>{index}</Text> */}

                  {/* <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text> */}
                  {/* <View style={styles.button}> */}

                  {/* </View> */}
                  {/* <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.Btn}> */}
                  {/* <Text>點我(on/off)</Text> */}
                  {/* </TouchableOpacity> */}


                  <View style={styles.headerLayoutStyle} >
                    <Text style={styles.commonTextStyle}>宇宙居民的留言</Text>
                  </View>

                  <View style={styles.slidingPanelLayoutStyle}>

                    <ScrollView style={styles.scrollView55}>
                    
                    <View style={{flexDirection:'row',justifyContent:'center',top:10}}>

                    <View>
                      <Image
                          source={{uri : `${marker.person.max.r_img}`}}
                          style={styles.personalitynumberimage}/>                  
                      <Text style={styles.personalitynumber}>{marker.person.max.percent}</Text>
                    </View>

                    <View>
                      <Image
                          source={{uri : `${marker.person.second.r_img}`}}
                          style={styles.personalitynumberimage}/>                  
                      <Text style={styles.personalitynumber}>{marker.person.second.percent}</Text>
                    </View>

                    <View>
                      <Image
                          source={{uri : `${marker.person.third.r_img}`}}
                          style={styles.personalitynumberimage}/>                  
                      <Text style={styles.personalitynumber}>{marker.person.third.percent}</Text>
                    </View>

                    <View>
                      <Image
                          source={{uri : `${marker.person.fourth.r_img}`}}
                          style={styles.personalitynumberimage}/>                  
                      <Text style={styles.personalitynumber}>{marker.person.fourth.percent}</Text>
                    </View>

                    <View>
                      <Image
                          source={{uri : `${marker.person.fifth.r_img}`}}
                          style={styles.personalitynumberimage}/>                  
                      <Text style={styles.personalitynumber}>{marker.person.fifth.percent}</Text>
                    </View>

                    </View>


                       <View style={{top:10}}>
                      <View style={{flexDirection:'row',  alignItems:'center' }}>
                        <Image
                          source= {{uri : `${marker.description.uid1.image}`}}
                          style={styles.reviewimage}
                        />
                        <Text>{marker.description.uid1.username} </Text>
                        <Text>{marker.description.uid1.message}</Text>
                      </View>
                      <View style={{flexDirection:'row',  alignItems:'center' }}>
                        <Image
                          source= {{uri : `${marker.description.uid2.image}`}}
                          style={styles.reviewimage}
                        />
                        <Text>{marker.description.uid2.username} </Text>
                        <Text>{marker.description.uid2.message}</Text>
                      </View>
                      <View style={{flexDirection:'row',  alignItems:'center' }}>
                        <Image
                          source= {{uri : `${marker.description.uid3.image}`}}
                          style={styles.reviewimage}
                        />
                        <Text>{marker.description.uid3.username} </Text>
                        <Text>{marker.description.uid3.message}</Text>
                      </View>
                      <View style={{flexDirection:'row',  alignItems:'center' }}>
                        <Image
                          source= {{uri : `${marker.description.uid4.image}`}}
                          style={styles.reviewimage}
                        />
                        <Text>{marker.description.uid4.username} </Text>
                        <Text>{marker.description.uid4.message}</Text>
                      </View>
                      <View style={{flexDirection:'row',  alignItems:'center' }}>
                        <Image
                          source= {{uri : `${marker.description.uid5.image}`}}
                          style={styles.reviewimage}
                        />
                        <Text>{marker.description.uid5.username} </Text>
                        <Text>{marker.description.uid5.message}</Text>
                      </View>

                      </View>
                    </ScrollView>
                  </View>

                  <View>
                    <TextInput
                      style={styles.review}
                      onChangeText={mess => this.setState({ mess })} value={this.state.mess}
                      placeholder="點這邊留言" />

                    <TouchableOpacity
                      onPress={() => { this.pushFire(index) }}
                      style={styles.passbutton}>

                      <Text style={styles.passbuttontext}>發送</Text>
                    </TouchableOpacity>
                    
                  </View>


                  <View>
                    <View style={{left:185,bottom:145}}>
             
                         <TouchableOpacity onPress={()=>{}}>                 
                           <Image source={require('../assets/smile2.png')} style={{width:35,height:35,}}/>                  
                         </TouchableOpacity>
                    </View>
                         <View style={{left:230,bottom:180}}>

                          <TouchableOpacity onPress={()=>{}}>                                     
                            <Image source={require('../assets/sad.png')} style={{width:35,height:35,}}/>                                
                          </TouchableOpacity>
                    </View>
                    
                </View>





                </View>
              </View>
            ))}
          </Animated.ScrollView>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center',textAlign:'center' }}>
        <Text>We need your permission!</Text>
      </View>
    )

  }
}

// export default function GoHome() {

//   const navigation  =  useNavigation();

//   return (
//       <View style={{flex:3}}>
         
//       <View style={{backgroundColor:'transparent',height:height*0.05}}> 
//           <TouchableOpacity style={{alignItems: "center", backgroundColor:'gray', height:height*0.05} } onPress={()=> navigation.push('socket')}>
//               <Text style={{fontSize:20,color:'white'}}>點擊進入邀請</Text>
//           </TouchableOpacity>
//       </View>
//       <Result/>
//     </View>
//   )
  
//  }


const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
      },
      text: {
        color: '#161F3D'
      },
      textInput: {
        width: 300,
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 5
      },
    
      iconFlat: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ffffff',
        width: 350,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
      },
      btnEnviar: {
        borderWidth: 1,
        borderColor: 'red',
        width: 50,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
      },
      chipsItem: {
        flexDirection:"row",
        backgroundColor:'#fff', 
        borderRadius:20,
        padding:8,
        paddingHorizontal:20, 
        marginHorizontal:10,
        height:40,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
      },
    
    
      markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
      },
      scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
      },
      cardImage: {
        flex: 3,
        width: "120%",
        height: "100%",
        alignSelf: "center",
    
      },
      textContent: {
        flex: 2,
        padding: 10,
      },
      cardtitle: {
        fontSize: 11,
        fontWeight: "bold",
        bottom: 173,
        textAlign: 'center'
      },
      cardDescription: {
        fontSize: 12,
        color: "#444",
      },
      button: {
        alignItems: 'center',
        marginTop: 10
      },
      marker: {
        width: 30,
        height: 30,
      },
      card: {
        padding: 20,
        elevation: 2,
        backgroundColor: "white",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.8,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    
      },
      searchBox: {
        position:'absolute', 
        marginTop: Platform.OS === 'ios' ? 40 : 20, 
        flexDirection:"row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf:'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
      },
      chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
      },
      btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20
      },
      text: {
        fontSize: 17,
        color: 'black',
        padding: 10
      },
      Btn: {
        padding: 10,
        backgroundColor: 'white'
      },
      scrollView55: {
        backgroundColor: 'white',
        width: CARD_WIDTH,
        height:CARD_HEIGHT
      },
      button1: {
        alignItems: 'center',
        marginTop: 3,
        width: '40%',
        left: 200,
        top: 30
      },
    
    
      headerLayoutStyle: {
        width: CARD_WIDTH,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        right: 30,
        bottom: 60
    
      },
      slidingPanelLayoutStyle: {
        width: CARD_WIDTH,
        height: 90,    //調整格子的大小
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        right: 30,
        bottom: 60
      },
    
      commonTextStyle: {
        color: 'black',
        fontSize: 13,
      },
      review: {
        borderColor: '#F0F0F0',
        backgroundColor: '#F0F0F0',
        borderWidth: 2,
        right: 30,
        width: CARD_WIDTH - 170,
        height:CARD_HEIGHT-250,
        bottom: 60
      },
      
        passbutton:{
          width:50,
          height:40,
          left:125,    
          bottom:100,
          borderColor:'#FF6347',
          borderWidth: 1,
          alignItems:'center',
          justifyContent:'center'
          
        },
      
      passbuttontext: {
        color: '#FF6347',
        textAlign:'center'
    
      },
      reviewimage: {
        margin: 5,
        width: 30,
        height: 30,
        resizeMode: 'contain'
    
      },
      personalitynumber:{
        flexDirection:'column',
        fontSize:12,
        textAlign:'center'
    
      },
    
      personalitynumberimage:{
          height:50,
          width:50,
          resizeMode:'contain'       
      },
  });