import React, { useState, useEffect } from 'react'
import { Text, View, Button, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import firebase from "firebase"
import {db, auth} from '../firebaseWrap'
import Header from './Header'


function NewChatScreen({ navigation }) {

  const [users,setUsers] = useState([])

  useEffect(() => {
    let alreadyChatting = []
    let currentUser = auth.currentUser.displayName
    db.collection('userinfo').doc(currentUser).get().then((cuserinfo) => {
      alreadyChatting = cuserinfo.data().chats
    })
    db.collection('userinfo').get().then((userinfo) => {
      setUsers([])
      userinfo.forEach((user, i) => {
        if (!alreadyChatting.includes(user.id) && user.id !== currentUser) {
          let data = user.data()
          setUsers(prev => [...prev,data])
        }
      });
    })
  },[])

  const addChat = (username) => {
    let sender = auth.currentUser.displayName
    let reciever = username
    db.collection('userinfo').doc(sender).update({
      chats: firebase.firestore.FieldValue.arrayUnion(reciever)
    })
    db.collection('userinfo').doc(reciever).update({
      chats: firebase.firestore.FieldValue.arrayUnion(sender)
    })
    db.collection('chats').doc(sender).update({
      [reciever]: firebase.firestore.FieldValue.arrayUnion({
        time: new Date().toUTCString(),
        uid: sender + "_" + reciever + "_" + Math.floor(Math.random() * 100000 + 1),
        attachment: "",
        sender: sender,
        reciever: reciever,
        type: "text",
        text: "Hi! I am "+sender+". I would like to talk to you.",
        seen: "✔️",
      })
    })
    db.collection('chats').doc(reciever).update({
        [sender]: firebase.firestore.FieldValue.arrayUnion({
        time: new Date().toUTCString(),
        uid: sender + "_" + reciever + "_" + Math.floor(Math.random() * 100000 + 1),
        attachment: "",
        sender: sender,
        reciever: reciever,
        type: "text",
        text: "Hi! I am "+sender+". I would like to talk to you.",
        seen: "✔️",
      })
    })
    navigation.navigate('Chats')
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView>
        {
          users.map((user) => (
            <TouchableOpacity onPress={() => addChat(user.username)}>
              <View style={styles.chat__container}>
                <Image
                  style={styles.chat__avatar}
                  source={{
                    uri: user.avatarURL,
                  }}
                />
                <View style={styles.chat__name}>
                  <Text style={{ fontSize: 17, fontWeight: "bold"}}>{user.username}</Text>
                  <Text style={{fontSize: 14, color: 'grey'}}>{user.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chat__container:{
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    borderRadius: 60,
    flexDirection: 'row',
    padding: 7,
  },
  chat__avatar: {
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderColor: 'black',  //CHANGE THIS IF YOU THINK IN FUTURE....
    borderRadius: 30,
    backgroundColor: 'lightgrey',
  },
  chat__name: {
    alignSelf: 'center',
    marginLeft: 10,
  },
})

export default NewChatScreen
