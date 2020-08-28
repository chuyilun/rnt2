import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CA, ImageBtn, SpecialEffects } from '../Screens.js';

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
              name="CA"
              component={CA}
              options={{ title:"create"}}
            />
            <AuthStack.Screen
              name="SpecialEffects"
              component={SpecialEffects}
              options={{ title:"Special you are!"}}
            />
          </AuthStack.Navigator>
        </NavigationContainer>
      );
    }
  }