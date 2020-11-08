import React, { useState,useEffect} from 'react'
import { Text, View, Button, StyleSheet, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import ChatHeader from '../Components/ChatHeader'
import { FontAwesome,Entypo,MaterialIcons } from '@expo/vector-icons';


function ChatRoomScreen({ route, navigation }) {

  var scrollview = React.useRef(null)



  const avatarURLtemp = "https://phoenixcreation2.herokuapp.com/static/logomain.png"

  const [messages,setMessages] = useState([]);
  const [msg,setMsg] = useState("");
  const [cameraVisible, setCameraVisible] = useState(true);

  useEffect(() => {
    if(msg === null || msg === ""){
      setCameraVisible(true)
    }else{
      setCameraVisible(false)
    }
  },[msg])

  useEffect(() => {
    let temp = [];
    let sent_op = ['true','false','true']
    let type_op = ['text','image','video','document']
    let text_op =[
      "Some random message....",
      "Some random message.... and very long for text wrap solution checking",
      "very sort",
      "Some random message....",
    ]
    for (var i = 0; i < 30 ; i++) {
      let tempMsg = {
        uid: i,
        sent: sent_op[Math.floor(Math.random() * 2)],
        type: type_op[0],
        text: text_op[Math.floor(Math.random() * 4)],
        attachment: {},
        time: Math.floor(Math.random() * 12) + ":" + Math.floor(Math.random() * 30) + "pm",
        seen: "✔️"
      }
      temp.push(tempMsg)
      setMessages(temp)
    }
  },[])

  const renderMSG = (message) => {
    scrollview.current.scrollToEnd({ animated: false})

    if(message.sent === "true"){
      return (
        <View style={styles.message__sent}>
          <Text style={{fontSize: 15}}>{message.text}</Text>
          <View style={{flex:1, flexDirection: "row", alignItems: 'flex-end', }}>
            <Text style={{flex: 1, textAlign: 'right', fontSize: 12, color: 'grey'}}>{message.time}</Text>
            <Text style={{fontSize: 12, color: 'grey'}}>{message.seen}</Text>
          </View>
        </View>
      );
    }else{
      return (
        <View style={styles.message__recieve}>
        <Text style={{fontSize: 15}}>{message.text}</Text>
        <Text style={{fontSize: 12, color: 'grey'}}>{message.time}</Text>

        </View>
      );
    }

  }


  return (
    <View style={{ flex: 1, backgroundColor: "#eee5dd" }}>
      <ChatHeader name={route.params.username} lastseen="two days ago" avatarURL={avatarURLtemp}/>
      <ScrollView ref={scrollview}>
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
          <TouchableOpacity>
            <FontAwesome name="paperclip" size={24} color="grey" style={{marginLeft: 4, marginRight: 15}} />
          </TouchableOpacity>
          { cameraVisible && <TouchableOpacity>
            <Entypo name="camera" size={24} color="grey" style={{marginRight: 10, marginLeft: 10}}/>
          </TouchableOpacity>}
        </View>
        <View style={styles.msg__senderVoice}>
          <TouchableOpacity>
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
