import React,{ useEffect, useState} from 'react'
import { Text, View, Button, StyleSheet, TextInput, ToastAndroid, Platform } from 'react-native';
import { auth } from '../firebaseWrap'


function SigninScreen({ navigation }) {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  var signIn = () => {
    if(email === null || email === "" || password === null || password === ""){
      if(Platform.os !== 'web'){

        // ToastAndroid.show("Please enter details", ToastAndroid.SHORT)
      }

    }
    else{
      if(Platform.os !== 'web'){

        // ToastAndroid.show("Signinng in.....", ToastAndroid.SHORT)
      }

      auth.signInWithEmailAndPassword(email,password)
        .catch(function(error){
          console.log(error);
          if(Platform.os !== 'web'){

            // ToastAndroid.show("something went wrong..", ToastAndroid.SHORT)
          }

        })
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.sigin__heading}>Log In</Text>
      <View style={styles.signin__inputContainer}>
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
          title="Log In"
          onPress={signIn}
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

export default SigninScreen
