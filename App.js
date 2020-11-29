import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { 
  StyleSheet, 
  Text,
  TextInput,
  TouchableOpacity,
  View 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Home() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! vamos</Text>
      <StatusBar style="auto" />
    </View>
  )
}

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>QUIZ APP</Text>
      <TextInput 
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput 
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function App() {
  const [isSignedIn,setSignIn] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { isSignedIn ? (
          <Stack.Screen name="Home" component={Home}/>
        ) : (
          <Stack.Screen name="SignIn" component={SignIn}/>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 65,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#fff'
  },
  input: {
    width: '80%',
    height: 30,
    backgroundColor: '#fff',
    margin: 20
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    margin: 10
  },
  buttonText: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  }
});
