import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import io from 'socket.io-client';
// import { markers } from './model/mapData';
import { useNavigation } from '@react-navigation/native';

// const socketURL = 'http://trackinglocation.skylab.vn'
const socketURL = 'http://172.20.10.4:3000'

// Ingnore warning timer on Android simulator
console.ignoredYellowBox = ['Setting a timer'];
let mapIndex = 0;


let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class location extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.socket = io(socketURL);

    this.state = {
      markerCoordinates : [],
      myposition:null,
      region:{
        latitude: 25.03404019627408, 
        longitude: 121.38913339813554,
        latitudeDelta: 0.004864195044303443,
        longitudeDelta: 0.0040142817690068,
      },
      coordinate: {
        latitude:  25.034958316223577, 
        longitude: 121.38934733979367,
      }, 
      chatMessage:"",
      chatMessages:[],
      ccch:'',
      myla:'',
      mylo:''
    }
    global.myla='';
    global.mylo='';
    
  }

  componentDidMount() {
    this._isMounted = true;

    const socket = this.socket;
    if (!socket) return;

    this.setState({})

    function success(pos){
      var crd = pos.coords;
      
      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);
      console.log('More or less ' + crd.accuracy + ' meters.');
      myla=crd.latitude;
      mylo=crd.longitude;

      
    }
    console.log("-------------"+myla)
    console.log("-------------"+mylo)
    navigator.geolocation.getCurrentPosition(
      success,
      (error) => console.log('Error:', error)
    )

    this.socket.on("chat message", msg => {
      this.setState({ chatMessages:[...this.state.chatMessages, msg  ]});
    });

    // socket.on('disconnect', () => alert('You have been disconnected.'));

    socket.on("locationUpdated", (locationState) => {
      const newMarkerCoordinates = Object.values(locationState).map( item => ({ 
        latitude: item.lat,
        longitude: item.lng
      }));

    //   this.socket.on('otherPositions', positionsData => {
    //     let tempFriends = {...this.state.friends};
    //     tempFriends[positionsData.id] = { ...positionsData };

    //     this.setState({
    //       friends: tempFriends,
    //     });
    // });

      this.setState({ markerCoordinates: newMarkerCoordinates });
    });
  }

  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({ chatMessage:"" });
  }

  renderMarkers = (markerCoordinates) => {
    return markerCoordinates.map((coord, index) => (
      <MapView.Marker
        key={ index }
        image={require('../assets/res_img.png')} 
        centerOffset={{ x: 25, y: 25}}
        anchor={{ x: 0.5, y: 0.5}}
        coordinate={coord}
        title={ `Truck ${index}` }
      />
    ));
  }


  render() {

    
    // {this.state.markers.map((marker, index) => {
    //   return (
    //     <MapView.Marker key={index} coordinate={marker.coordinate} description={marker.description}>
    //       <Animated.View style={[styles.markerWrap]}>
    //         <Animated.Image
    //           source={require('./assets/map_marker.png')}
    //           style={styles.marker}
    //           resizeMode="cover"
    //         />
    //       </Animated.View>
    //     </MapView.Marker>
    //   );
    //   })}

    const { region, markerCoordinates } = this.state;
    
    const chatMessages = this.state.chatMessages.map(chatMessage => (<Text key={chatMessage}>{chatMessage}{"\n"}</Text>));
    const ccch = this.state.chatMessages.map(chatMessage => (chatMessage));
    var ccee = ccch.toString();
  
  
    // const chatMessage = realm.object('chatMessages');
    // const seen = JSON.stringify(chatMessage, Realm.JsonSerializationReplacer)
    console.log("chatMessages////////////////////////"+ccee);

    // var seen = []; 
    // var replacer = function(key, value) {
    //   if (typeof value === "object" && value !== null) {
    //     if (seen.indexOf(value) >= 0) {
    //       return;
    //     }
    //     seen.push(value);
    //   }
    //   return value;
    // };
    // JSON.stringify(chatMessages, replacer); 
    // var obj = Object.keys(chatMessages).map(function(_) { return c
    // hatMessages[_]; });

    // console.log(seen)

    return (
      <View style={styles.container}>
        <MapView
           provider={ PROVIDER_GOOGLE }
           initialRegion={ region }
           style={ styles.mapView }
           showsUserLocation
        >
          <MapView.Marker
              coordinate={{
                latitude: myla,
                longitude: mylo,
              }}
              title={"ME"}
              description={ccee}
            ><Image source={require("../assets/res_img.png")} style={styles.marker}/>
          </MapView.Marker>
          <MapView.Marker
              coordinate={{
                latitude: 25.034030695440066,
                longitude: 121.38952213558267,
              }}
              description={"這裡的人都有點害羞耶"}
              title={"CC"}
            ><Image source={require("../assets/agree_img.png")} style={styles.marker}/>
          </MapView.Marker>
          <MapView.Marker
              coordinate={{
                latitude: 25.0346930847256,
                longitude: 121.38819747764435,
              }}
              description={"組團打球就差你一個了"}
              title={"AA"}
            ><Image source={require("../assets/extra_img.png")} style={styles.marker}/>
          </MapView.Marker>
          <MapView.Marker
              coordinate={{
                latitude: 25.03507557203697,
                longitude: 121.387530379581,
              }}
              description={"我們正在討論晚餐吃什麼，要的+1"}
              title={"33"}
            ><Image source={require("../assets/neu_img.png")} style={styles.marker}/>
          </MapView.Marker>
          <MapView.Marker
              coordinate={{
                latitude: 25.03527862037391,
                longitude: 121.38886457570432,
              }}
              description={"今天咖啡賣一送一，有誰要加一"}
              title={"DD"}
            ><Image source={require("../assets/open_img.png")} style={styles.marker}/>
          </MapView.Marker>
        </MapView>
        <View style={styles.iconFlat}>
            <View>
                <TextInput style={styles.textInput}
                autoCorrect={false}
                value={this.state.chatMessage}
                onSubmitEditing={() => this.submitChatMessage()}
                onChangeText={chatMessage => {
                this.setState({ chatMessage });
                }}/>
            </View>
            <Text>{ chatMessages }</Text>
          </View>
      </View>
    );
  }
}

export default function Gomesboard() {
    
  const navigation  =  useNavigation();

  return(
    <View style={{alignItems:'center', justifyContent:'center' , flex:1} }>
        <location />
    <View style={{alignItems:'center', justifyContent:'center' , flex:1}}>
       <TouchableOpacity style={{backgroundColor:'gray', padding:10 , marginTop:screenHeight*0.3, marginLeft:screenWidth*0.3 } } onPress={()=> navigation.push('ImageBtn')}>
            <Text style={{fontSize:20,color:'white'}}>!!</Text>
        </TouchableOpacity>
    </View>
    
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  mapView : {
    flex: 1,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 70,
    height: 70,
  },
  textInput: {
    height: 30,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 5
  },
});