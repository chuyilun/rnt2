import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBtn, SpecialEffects, FaceGame, DrawCard, LoginScreen, RegisterScreen, Document_go, Result_go, planet, socket, map } from '../Screens.js';

const AuthStack = createStackNavigator();

export default class Routes extends Component {
    render() {
      return (
        <NavigationContainer>
          <AuthStack.Navigator>
            <AuthStack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ title:"Log in"}}
            />
            <AuthStack.Screen
              name="ImageBtn"
              component={ImageBtn}
              options={{ title:"FacePlanet"}}
            />
            <AuthStack.Screen
              name="Document_go"
              component={Document_go}
              options={{ title:""}}
            />
             <AuthStack.Screen
              name="Result_go"
              component={Result_go}
              options={{ title:""}}
            />
            <AuthStack.Screen
              name="DrawCard"
              component={DrawCard}
              options={{ title:"抽抽"}}
            />
            <AuthStack.Screen
              name="SpecialEffects"
              component={SpecialEffects}
              options={{ title:"Special you are!"}}
            />
            <AuthStack.Screen
              name="FaceGame"
              component={FaceGame}
              options={{ title:"Special you are!"}}
            />
            <AuthStack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{ title:"Register"}}
            />
            <AuthStack.Screen
              name="planet"
              component={planet}
              options={{ title:"我的宇宙"}}
            />
            <AuthStack.Screen
              name="socket"
              component={socket}
              options={{ title:"Face To Face"}}
            />
            <AuthStack.Screen
              name="map"
              component={map}
              options={{ title:"Leave Your Message"}}
            />
          </AuthStack.Navigator>
        </NavigationContainer>
      );
    }
  }