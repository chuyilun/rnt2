import React, { Component } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import Constants from './game/Constants';
import { GameEngine, GameLoop  } from "react-native-game-engine";
import { Camera } from 'expo-camera';
import Matter from "matter-js";
import Rocket from './game/Rocket';
import { Physics, Trajectory } from "./gsystem";
import Obs from './game/Obs';
import FaceDetect from './gindex';
import Images from './game/Images';
import Floor from './game/Floor';

Matter.Common.isElement = () => false;

export default class game extends Component {

  constructor(props){
      super(props);
      this.gameEngine = null;
      this.entities = this.setupWorld();
      this.state = {
          running: true,
          score:0 ,
      }
  }

  setupWorld = () => {
      const engine = Matter.Engine.create({ enableSleeping: false });
      const world = engine.world;

      const rocket = Matter.Bodies.rectangle( Constants.MAX_WIDTH /4, 0-Constants.MAX_HEIGHT/5, 50, 50);
      const floor = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT/2 , Constants.MAX_WIDTH*2, 10, { isStatic: true} );
      const celling = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, 0-Constants.MAX_HEIGHT/2, Constants.MAX_WIDTH*2, 10, { isStatic: true} );
      // ( x座標(373), y座標(667(+-300)), 底, 高)

      const place1 = Math.floor(Math.random()*Constants.MAX_WIDTH);
      const place2 = Math.floor(Math.random()*Constants.MAX_WIDTH);
      const place3 = Math.floor(Math.random()*Constants.MAX_WIDTH);
      const place4 = Math.floor(Math.random()*Constants.MAX_WIDTH);

      
      const obs1 = Matter.Bodies.rectangle( place1 , Constants.MAX_HEIGHT/3*2, 50, 50, { isStatic: true});
      const obs2 = Matter.Bodies.rectangle( place2 , Constants.MAX_WIDTH , 50, 50, { isStatic: true});

      const obs3 = Matter.Bodies.rectangle( place3, Constants.MAX_HEIGHT/3*-1 , 50 , 50 , { isStatic: true});
      const obs4 = Matter.Bodies.rectangle( place4, Constants.MAX_HEIGHT/4*-1 , 50 , 50 , { isStatic: true});
      

      Matter.World.add(world, [rocket, floor, celling, obs1, obs2, obs3, obs4 ]);
      Matter.Events.on(engine, "collisionStart", (event) => {
          let pairs = event.pairs;

          this.gameEngine.dispatch({ type: "game-over"});
      });

      return{
          physics: { engine: engine, world: world },
          obs1: { body: obs1, renderer: Obs},
          rocket: { body: rocket, renderer: Rocket},
          floor: { body: floor,color:'red', renderer: Floor},
          celling: { body: celling,color:'red', renderer: Floor},
          obs2: { body: obs2, renderer: Obs},
          obs3: { body: obs3, renderer: Obs},
          obs4: { body: obs4, renderer: Obs},
      }
  }

  onEvent =(e) => {
      if (e.type === "game-over"){
          // console.log("Game Over");
          this.setState({
              running: false
          });
      }else if ( e.type === "score") {
          this.setState({
              score: this.state.score +1
          })
      }
  }

  // reset = () => {
  //     resetObs();
  //     this.gameEngine.swap(this.setupWorld());
  //     this.setState({
  //         running: true,
  //         score:0
  //     });
  // }

  render() {


      return (
          <View >
              <View style={styles.contain}>
                  <FaceDetect />
                  <Image source={Images.background} style={ styles.backgroundImage} resize="stretch" />
                  <GameEngine
                      ref={( ref ) => {this.gameEngine =ref;}}
                      systems={[Physics, Trajectory]}
                      running = { this.state.running }
                      onEvent={this.onEvent}
                      entities={this.entities}>
                  </GameEngine>
                  <Text style={styles.score}>{this.state.score}</Text>
                  {!this.state.running && <TouchableOpacity onPress={this.reset} style = {styles.fullScreenButton}>
                      <View style={styles.fullScreen}>
                          <Text style = {styles.gameOver}>GG</Text>
                      </View></TouchableOpacity>}
              </View>
              <View style={{ display: 'none' }}>
              </View>
          </View>
      )
  }
  
}

const styles = StyleSheet.create({
  contain: {
      flex: 1,
      backgroundColor: '#ecf0f1',
      padding: 10,        
    },
  backgroundImage: {
      position:   'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: Constants.MAX_WIDTH,
      height: Constants.MAX_HEIGHT
  },
  btnstyle: {
      padding: 13,
      margin: 15,
      backgroundColor: '#dddddd',
  },
  text: {
      fontSize:21
  },
  fullScreen: {
      position : 'absolute',
      backgroundColor: 'black',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.8,
      justifyContent: 'center',
      alignItems: 'center'
  },
  gameOver: {
      color : 'white',
      fontSize: 48
  },
  fullScreenButton: {
      position : 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: Constants.MAX_HEIGHT,
      flex: 1
  },
  score: {
      position: 'absolute',
      color: 'white',
      fontSize: 60,
      left: Constants.MAX_WIDTH /2 -24,
      textShadowColor: '#444444',
      textShadowOffset: {width: 2, height: 2},
      textShadowRadius: 2,   
  }
});