import React,{ useEffect, useState} from 'react'
import { Text, View, Button, StyleSheet, TextInput, ToastAndroid, Platform, Image, Switch } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import { db, auth, storage } from '../firebaseWrap'


function SignupScreen({ navigation }) {
  const [accounts,setAccounts] = useState([])
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [image, setImage] = useState(null)
  const [imageObj,setImageObj] = useState(null)
  const [nameBorderColor, setNameBorderColor] = useState('red')
  const [ntoken,setNtoken] = useState("")
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  useEffect(() => {
    let acc = []
    db.collection('userinfo').get().then((query) => {
      query.forEach((item, i) => {
        acc.push(item.id)
      });
      setAccounts(acc)
    })
  },[])

  useEffect(() => {
    if(!accounts.includes(name) && name !== ""){
      setNameBorderColor('green')
    }else{
      setNameBorderColor('red')
    }
  },[name])

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const tkn = async () => {
    let token = await Notifications.getExpoPushTokenAsync()
    ToastAndroid.show("got the token",ToastAndroid.SHORT)
    setNtoken(token)

  }

  useEffect(() => {
    if(isEnabled === true && ntoken === ""){
      tkn()
    }
  },[isEnabled])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      let blob = await fetch(result.uri).then(r => r.blob());
      setImage(result.uri);
      setImageObj(blob);
    }
  };


  var signUp = async () => {
    if (
      name === null || name === "" || email === null || email === "" || password === null || password === "") {
      ToastAndroid.show("Please enter details..",ToastAndroid.SHORT)
    }else if(nameBorderColor === "red"){
      ToastAndroid.show("Username is already taken..",ToastAndroid.SHORT)
    }
    else{
      ToastAndroid.show("Creating account...",ToastAndroid.SHORT)


      auth.createUserWithEmailAndPassword(email,password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name
        })

        const uploadTask = storage.ref(`ProfileImages/${name}`).put(imageObj)
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {console.log(error)},
          () => {
            storage
              .ref('ProfileImages')
              .child(name)
              .getDownloadURL()
              .then((url) => {
                authUser.user.updateProfile({
                  photoURL: url
                })
                ToastAndroid.show("Done uploading",ToastAndroid.SHORT)
                db.collection('userinfo').doc(name).set({
                  email: email,
                  username: name,
                  avatarURL: url,
                  description: "I am phoenix",
                  chats: [],
                  notification_token: ntoken,
                })
                // TODO: Add a chat doc here... Initialize it for the user....

              })

          }
        )

      })
      .catch(function(error) {
        console.log(error)
        ToastAndroid.show("something went wrong",ToastAndroid.SHORT)
      })
    }
  }


  const styles = StyleSheet.create({
    sigin__heading: {
      color: '#075e55',
      fontSize: 30,
    },
    signin__image: {
      width: 120,
      height: 120,
      alignSelf: 'center',
      margin: 10,
      borderRadius: 100,
      borderColor: 'grey',
      borderWidth: 1,
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
    },
    signin__name: {
      marginTop: 10,
      borderColor: nameBorderColor,
      borderBottomWidth: 2,
    },
  })


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.sigin__heading}>Create Account</Text>
      <View style={styles.signin__inputContainer}>
        <Button title="Select Profile Picture" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.signin__image} />}
        <TextInput
          style={{...styles.signin__input, ...styles.signin__name}}
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
        <View style={{flexDirection: "row", alignItems: "center", marginBottom: 5}}>
          <Text>Do you want notifications? :</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Button
          title="Create Account"
          onPress={signUp}
        />
      </View>
    </View>
  );
}



export default SignupScreen
