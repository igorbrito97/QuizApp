import { auth, database } from 'firebase';
import React, {useState} from 'react';
import { 
  Alert,
  StyleSheet, 
  Text,
  TextInput,
  TouchableOpacity,
  View 
} from 'react-native';

export default function SignUp({navigation}) {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  return (
      <View style={styles.container}>
        <Text style={styles.titleText}> CADASTRO </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name:</Text>
          <TextInput 
            style={styles.input}
            autoCapitalize="words"
            value={name}
            onChangeText={(value) => setName(value)}/>
          <Text style={styles.inputText}>E-mail:</Text>
          <TextInput 
            style={styles.input}
            
            keyboardType="email-address"
            value={email}
            onChangeText={(value) => setEmail(value)}/>
          <Text style={styles.inputText}>Password:</Text>
          <TextInput 
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => setPassword(value)}/>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={() => {
              if(name.trim() == "" || name.length < 4)
                Alert.alert("Type a valid name!");
              else if(email.trim() == "" || email.length < 7)
                Alert.alert("Type a valid e-mail!");
              else if(password.trim() == "" || password.length < 6)
                Alert.alert("Type a valid passwoard!");
              else {
                auth()
                .createUserWithEmailAndPassword(email,password)
                .then((data) => {
                  if(data.user) {
                    database()
                    .ref('/users/' + data.user.uid)
                    .set({
                      name: name
                    })
                    .then(() => {
                      navigation.navigate('Home', {
                        userId: data.user.uid
                      });
                    })
                  }
                })
                .catch(error => Alert.alert("Error!!! " + error));
              }
            }}
          >
            <Text style={styles.btnText}>CONFIRMAR</Text>
          </TouchableOpacity>
          </View>
          <Text 
            style={styles.haveAccountText} 
            onPress={() => {
              navigation.navigate('Login');
            }}  
          >Already have an account? Login</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B69CA',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 35,
    color: '#fff',
    fontFamily: 'serif',
    fontWeight: '600'
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '85%',
    alignItems: 'center',
    borderRadius: 25
  },
  inputText: {
    fontSize: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: 15,
    marginTop: 5,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#2B69CA'
  },
  confirmButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#2B69CA',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  haveAccountText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '400',
    textDecorationLine: 'underline'
  },
});