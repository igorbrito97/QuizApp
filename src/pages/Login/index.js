import React, {useState} from 'react';
import { 
    Alert,
    Image,
    StyleSheet, 
    Text,
    TextInput,
    TouchableOpacity,
    View 
} from 'react-native';
import { auth } from 'firebase';


export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
          <Image style={styles.image} source={require('/home/iguinho/Documentos/QuizApp/src/media/logo.png')}/>
          <Text style={styles.titleText}> QuizApp </Text>
          <View style={styles.logoContainer}>
              <Text style={styles.inputText}>E-mail:</Text>
              <TextInput 
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
              />
              <Text style={styles.inputText}>Password:</Text>
              <TextInput 
                  style={styles.input}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(value) => setPassword(value)}
              />
              <TouchableOpacity 
                style={styles.buttonLogin} 
                onPress={() => {
                  if(email.trim() == "")
                    console.log("erro na hora de logar ali");
                  else if(password.trim() == "")
                    console.log("erro na hora de logar ali");
                  else {
                      if(email.trim() == "")
                        Alert.alert('Invalid e-mail. Type a valid one!!!');
                      else if(password.trim() == "")
                        Alert.alert('Invalid password. Type a valid one!!!');
                      else {
                        auth()
                        .signInWithEmailAndPassword(email,password)
                        .then((data) => {
                          console.log("usuario logado!");
                          console.log(data);
                          navigation.navigate('Home');
                        })
                        .catch(error => {
                          console.log("Erro!!!!" + error);
                        })
                      }
                }}}>
                  <Text style={styles.buttonLoginText}>ENTRAR</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.buttonSignUp}
                onPress={() => {
                    navigation.navigate('SignUp');
                }}>
                  <Text style={styles.buttonSignUpText}>CADASTRAR</Text>
              </TouchableOpacity>  
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B69CA',
        alignItems: 'center',
        justifyContent: 'center'
      },
      titleText: {
        fontSize: 65,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'#fff',
        fontFamily: 'serif',
        marginBottom: 40
      },
      input: {
        width: '80%',
        height: 30,
        backgroundColor: '#fff',
        margin: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 4,
        paddingLeft: 3,
        paddingRight: 5
      },
      inputText: {
          fontSize: 20,
          marginBottom: -15,
          marginTop: 10
      },
      buttonLogin: {
        width: '80%',
        height: 40,
        backgroundColor: '#2B69CA',
        borderRadius: 7,
        margin: 10,
        justifyContent: 'center'
      },
      buttonSignUp: {
        width: '80%',
        height: 40,
        backgroundColor: 'white',
        margin: 15,
        borderWidth: 1.5,
        borderColor: '#2B69CA',
        borderRadius: 7
      },
      buttonLoginText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
      },
      buttonSignUpText: {
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
      },
      image: {
          width: 296.5,
          height: 159.5
      },
      logoContainer: {
          width: 300,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 25
      }
});////main color: #2B69CA - 0078FF