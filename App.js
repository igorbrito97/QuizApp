import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

import databaseConfig from './src/databaseConfig';

const Stack = createStackNavigator();

import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp';
import Home from './src/pages/Home';

export default function App() {
  const [isSignedIn,setSignIn] = useState(false);

  useEffect(() => {
    firebase.initializeApp(databaseConfig);
    console.log("inicializou")
  },[]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{
            headerShown: false
          }}/>
        <Stack.Screen 
          name="SignUp" 
          component={SignUp}
          options={{
            headerShown: false
          }}
        /> 
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{
            headerShown: false
          }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}