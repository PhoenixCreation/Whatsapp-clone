import React, { useState,useEffect,useContext} from 'react'
import firebase from 'firebase'
import { Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal} from 'react-native';
import ChatHeader from '../Components/ChatHeader'
import { db, auth } from "../firebaseWrap"
import {ChatContext} from '../stateManager'
import { FontAwesome,Entypo,MaterialIcons, Ionicons } from '@expo/vector-icons';


function ChatRoomScreen({ route, navigation }) {

  var scrollview = React.useRef(null)

  const [wholeChats,setWholeChats] = useContext(ChatContext)



  // const avatarURLtemp = "https://phoenixcreation2.herokuapp.com/static/logomain.png"

  const [messages,setMessages] = useState([]);
  const [msg,setMsg] = useState("");
  const [cameraVisible, setCameraVisible] = useState(true);
  const [showPinMedia, setShowPinMedia] = useState(false);




  useEffect(() => {
    if(msg === null || msg === ""){
      setCameraVisible(true)
    }else{
      setCameraVisible(false)
    }
  },[msg])

  useEffect(() => {
    scrollview.current.scrollToEnd({ animated: false})
  },[messages])

  useEffect(() => {
    setMessages([])
    let current = auth.currentUser.displayName
    let tempMsges = []
    let tm = wholeChats[route.params.username]
    tm.reverse()
      for (var i = 0; i < tm.length; i++) {
        let temp = {}
        temp.uid = tm[i].uid
        temp.type = tm[i].type
        temp.text = tm[i].text
        temp.attachment = tm[i].attachment
        if (tm[i].sender === current) {
          temp.sent = 'true'
        } else {
          temp.sent = 'false'
        }
        temp.seen = tm[i].seen
        temp.time = tm[i].time
        tempMsges.push(temp)
      }
      setMessages(tempMsges)
      scrollview.current.scrollToEnd({ animated: false})

  },[wholeChats,route.params.username])



  const sendMsg = () => {
    if(!cameraVisible){
      //send message.....
      // TODO: 1. append message to self 2. append message to reciever
      // 1. append message to self
      let sender = auth.currentUser.displayName
      let reciever = route.params.username
      db.collection('chats').doc(sender).update({
        [reciever]: firebase.firestore.FieldValue.arrayUnion({
          time: new Date().toUTCString(),
          uid: sender + "_" + reciever + "_" + Math.floor(Math.random() * 100000 + 1),
          attachment: "",
          sender: sender,
          reciever: reciever,
          type: "text",
          text: msg,
          seen: "✔️",
        })
      })
      // 2. append message to reciever
      db.collection('chats').doc(reciever).update({
          [sender]: firebase.firestore.FieldValue.arrayUnion({
          time: new Date().toUTCString(),
          uid: sender + "_" + reciever + "_" + Math.floor(Math.random() * 100000 + 1),
          attachment: "",
          sender: sender,
          reciever: reciever,
          type: "text",
          text: msg,
          seen: "✔️",
        })
      })
      setMsg("")
  }
}

  const renderMSG = (message) => {
    scrollview.current.scrollToEnd({ animated: false})

    if(message.sent === "true"){
      return (
        <View style={styles.message__sent}>
          <Text style={{fontSize: 15}}>{message.text}</Text>
          <View style={{flex:1, flexDirection: "row", alignItems: 'flex-end', }}>
            <Text style={{flex: 1, textAlign: 'right', fontSize: 12, color: 'grey'}}>{new Date(message.time).getHours() + " : " + new Date(message.time).getMinutes()}</Text>
            <Text style={{fontSize: 12, color: 'grey'}}>{message.seen}</Text>
          </View>
        </View>
      );
    }else{
      return (
        <View style={styles.message__recieve}>
        <Text style={{fontSize: 15}}>{message.text}</Text>
        <Text style={{fontSize: 12, color: 'grey'}}>{new Date(message.time).getHours() + " : " + new Date(message.time).getMinutes()}</Text>

        </View>
      );
    }

  }


  return (
    <View style={{ flex: 1, backgroundColor: "#eee5dd" }}>

      <ChatHeader name={route.params.username} lastseen="two days ago" avatarURL={route.params.avatarURL} navigation={navigation}/>
      <ScrollView ref={scrollview} style={{marginTop: 15}}>
        {
          messages.map((message) => (
            <View key={message.uid} style={styles.message}>
              {
                renderMSG(message)
              }
            </View>
          ))
        }
      </ScrollView>
      <View style={styles.msg__senderContainer}>
        <View style={styles.msg__senderMain}>
          <TouchableOpacity>
            <Entypo name="emoji-happy" size={24} color="lightgrey" />
          </TouchableOpacity>
          <TextInput
            value={msg}
            onChangeText={text => setMsg(text)}
            style={styles.msg__input}
            placeholder="Type a message"
            multiline
          />
          <TouchableOpacity onPress={() => setShowPinMedia(true)}>
            <FontAwesome name="paperclip" size={24} color="grey" style={{marginLeft: 4, marginRight: 15}} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            visible={showPinMedia}
            transparent={true}
            onRequestClose={() => {
              setShowPinMedia(false)
            }}
          >
            <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
              <TouchableOpacity
                onPress={() => setShowPinMedia(false)}
                style={{ position: 'absolute', top: 0,left: 0,right:0,bottom:0}}
              >
              </TouchableOpacity>
              <PinMedia />
            </View>
          </Modal>
          { cameraVisible && <TouchableOpacity>
            <Entypo name="camera" size={24} color="grey" style={{marginRight: 10, marginLeft: 10}}/>
          </TouchableOpacity>}
        </View>
        <View style={styles.msg__senderVoice}>
          <TouchableOpacity onPress={sendMsg}>
          {
            cameraVisible ? (
              <Entypo name="mic" size={24} color="white" style={{alignSelf: 'center'}} />

            ) : (
              <MaterialIcons name="send" size={24} color="white" style={{alignSelf: 'center'}}/>
            )
          }
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const PinMedia = () => {
  return (
    <View style={{
        marginBottom: 55,
        backgroundColor: "white",
        flexDirection: "column",
        width: "97%",
        height: 210,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
      }}>
      <View style={{ flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', flex: 1}}>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{ padding: 15, backgroundColor: '#6065cd', borderRadius: 50,}}>
            <Ionicons name="md-document" size={24} color="white" />

          </TouchableOpacity>
          <Text>Document</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{ padding: 15, backgroundColor: '#ec407a', borderRadius: 50,}}>
            <FontAwesome name="camera" size={24} color="white"  />

          </TouchableOpacity>
          <Text>Camera</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{ padding: 15, backgroundColor: '#b953cf', borderRadius: 50,}}>
            <FontAwesome name="photo" size={24} color="white"  />

          </TouchableOpacity>
          <Text>Gallery</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', flex: 1}}>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{ padding: 15, backgroundColor: '#f17901', borderRadius: 50, marginLeft: 10}}>
            <Ionicons name="md-headset" size={24} color="white" />

          </TouchableOpacity>
          <Text>Audio</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{ padding: 15, backgroundColor: '#118c50', borderRadius: 50,}}>
            <Entypo name="location-pin" size={24} color="white" />

          </TouchableOpacity>
          <Text>Location</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{ padding: 15, backgroundColor: '#0eaaf4', borderRadius: 50,}}>
            <Ionicons name="md-person" size={24} color="white" />

          </TouchableOpacity>
          <Text>Contact</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  message:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message__sent:{
    flexDirection: "column",
    alignSelf: 'flex-end',
    maxWidth: '70%',
    minWidth: '50%',
    marginBottom: 3,
    padding: 5,
    marginRight: 10,
    backgroundColor: "#e2ffc7",
    borderRadius: 7,
    borderTopRightRadius: 0,
    shadowColor: '#000000',
    shadowOffset: {
      width: -5,
      height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,
    elevation: 5,
  },
  message__recieve:{
    flexDirection: "column",
    maxWidth: '70%',
    alignSelf: 'flex-start',
    marginBottom: 3,
    padding: 5,
    marginLeft: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderTopLeftRadius: 0,
    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,
    elevation: 5,
  },
  msg__senderContainer: {
    flexDirection: "row",
    justifyContent: 'space-around',
  },
  msg__senderMain: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 2
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,
    elevation: 5,
    padding: 10,
    borderRadius: 50,
    margin: 5,
    alignItems: 'center',
  },
  msg__input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 5,
    alignSelf: 'center',

  },
  msg__senderVoice: {
    backgroundColor: "#074d55",
    padding: 12,
    margin: 5,
    marginLeft: 0,
    borderRadius: 50,
    alignItems: 'center',
    paddingTop: 10,
    maxHeight: 50,
  }
})

export default ChatRoomScreen
