import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBtn, SpecialEffects, FaceGame, Compare, DrawCard, LoginScreen, RegisterScreen } from '../Screens.js';

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
              name="Compare"
              component={Compare}
              options={{ title:"Special you are!"}}
            />
            <AuthStack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{ title:"Register"}}
            />
          </AuthStack.Navigator>
        </NavigationContainer>
      );
    }
  }