import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated,Image} from "react-native";
import styles from '../styles/index.style';

class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
      NumberHolder : 1,
      imgArr : [
        require('../assets/p1.png'),
        require('../assets/p2.png'),
        require('../assets/p3.png'),
        require('../assets/p4.png'),
        require('../assets/p5.png'),
        require('../assets/hotpot.png')
      ],
      planet_image : require('../assets/p1.png')
    };   
  }

  GenerateRandomNumber=()=>{

    var RandomNumber = Math.floor(Math.random() * 6) ;

    this.setState({
      NumberHolder : RandomNumber,
      planet_image : this.state.imgArr[RandomNumber]
    })

  }

  render() {
    return(

      <View style={styles.container1}>
      <View style={styles.container1}>
        <Image style={styles.image_d} source={this.state.planet_image}></Image>
      </View>
      <TouchableOpacity style={styles.button_d} onPress={this.GenerateRandomNumber}>
        <Text>開抽!</Text>
      </TouchableOpacity>
    </View>
    
    )
  }
  

}

export default function App() {
  
  return (
    <Card/>
    
   );

}
      