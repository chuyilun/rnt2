import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBtn, SpecialEffects, FaceGame, Compare, DrawCard } from '../Screens.js';

const AuthStack = createStackNavigator();

export default class Routes extends Component {
    render() {
      return (
        <NavigationContainer>
          <AuthStack.Navigator>
            <AuthStack.Screen
              name="SSS"
              component={ImageBtn}
              options={{ title:"ml2222"}}
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
          </AuthStack.Navigator>
        </NavigationContainer>
      );
    }
  }