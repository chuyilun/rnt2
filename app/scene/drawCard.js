import React,{Component,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated,Image, Alert,TouchableHighlight, Button} from "react-native";
import styles from '../styles/index.style';



var alertMessage = '抽獎要扣1個金幣喔，你確定嗎?';
var count = 3;


class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: require('../assets/p2.png'),
      NumberHolder : 1,
      imgArr : [
        require('../assets/p1.png'),
        require('../assets/p2.png'),
        require('../assets/p3.png'),
        require('../assets/p4.png'),
        require('../assets/p5.png'),
        require('../assets/hotpot.png'),
        require('../assets/chocolate.png')
      ],
      planet_image : require('../assets/p1.png')
    };   
  }
  
  GenerateRandomNumber=()=>{
    
    count = count-1;
    if(count<0){
    Alert.alert('對話窗格','你沒金幣了，要不要加值呢?')
    count = 0;  
  }

    var RandomNumber = Math.floor(Math.random() * 6) ;
    
    this.setState({
      NumberHolder : RandomNumber,
      planet_image : this.state.imgArr[RandomNumber]
    })

    Alert.alert('對話窗格','恭喜你抽中')
  }



  render() {
    return(

      <View style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center', padding: 20,}}>
          <Image style={styles.image} source={this.state.planet_image}></Image>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.button}
          //onPress={this.GenerateRandomNumber}
          onPress={
            ()=>Alert.alert(
            '對話視窗',
            alertMessage,
            [
              {text:'先不要啦', onPress: () => console.log('使用者沒抽耶')},
              {text:'來吧', onPress:this.GenerateRandomNumber}//,console.log('有')}}
            ]
                          )
                    }
          >
          <Text>我要抽獎</Text>
        </TouchableOpacity>
        </View>  
        <View style={{flexDirection: 'row'}}>
          <Image 
          style={styles.coin}
          source={require('../assets/goldcoin.png')}
          />
          <Text style={styles.coinText}>  X{count?count : 0}</Text>
        </View>
      </View>
    
    )
  }
  

}

export default function App() {
  
  return (
    <Card/>
   );

}
      