import React,{ useEffect, useState} from 'react'
import { Text, View, Button, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import { auth } from '../firebase'


function SignupScreen({ navigation }) {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")


  var signUp = () => {
    if (name === null || name === "" || email === null || email === "" || password === null || password === "") {
      ToastAndroid.show("Please enter details..",ToastAndroid.SHORT)
    }else{
      auth.createUserWithEmailAndPassword(email,password)
        .catch(function(error) {
          ToastAndroid.show("something went wrong",ToastAndroid.SHORT)
        })
    }
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.sigin__heading}>Create Account</Text>
      <View style={styles.signin__inputContainer}>
        <TextInput
          style={styles.signin__input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Your name"
        />
        <TextInput
          style={styles.signin__input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Your email address"
          autoCompleteType='off'
        />
        <TextInput
          style={styles.signin__input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Your password"
          secureTextEntry
        />
        <Button
          title="Create Account"
          onPress={signUp}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sigin__heading: {
    color: '#075e55',
    fontSize: 30,
  },
  signin__inputContainer:{
    width: '100%',
    padding: 50,
  },
  signin__input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    marginBottom: 15,
  }
})

export default SignupScreen
