import React,{ useState, useEffect, useContext } from 'react'
import { Text, View, Button, StatusBar, ScrollView, StyleSheet, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { db, auth } from "../firebaseWrap"
import Header from '../Components/Header'
import ProfileInfo from '../Components/ProfileInfo'

import { ChatContext } from '../stateManager'


function ChatScreen({ navigation }) {

  const [wholeChats,setWholeChats] = useContext(ChatContext)

  const [chats,setChats] = useState([]);
  const [showAvatarBox,setShowAvatarBox] = useState(false)
  const [avatarURL, setAvatarURl] = useState("")
  const [usersInfo,setUsersInfo] = useState([])
  // const avatarURLtemp = "https://phoenixcreation2.herokuapp.com/static/logomain.png"
  const avatarURLtemp = "https://source.unsplash.com/random/"

  useEffect(() => {
    db.collection('userinfo').get().then((users) => {
      users.forEach((user, i) => {
        let dt = user.data()
        setUsersInfo((prev) => [...prev,{username: dt.username, avatarURL: dt.avatarURL}])
      });

    })
  },[])

  useEffect(() => {
    let tempchats = [];
    const last_ticks = ["","✔️","Ld_Gaurav"]
    for (var i = 0; i < 5; i++) {
      tempchats.push({
        ukey: i,
        type: "personal",
        avatarURL: avatarURLtemp,
        username: "Test User",
        last_chat_time: "1:22 pm",
        last_tick: last_ticks[Math.floor((Math.random() * 3))],
        last_message: "This are some random text message from me",
        unread_count: Math.floor((Math.random() * 10))
      })
    }
    setChats(tempchats);

  },[])

  useEffect(() => {
    setChats([])
    let name = auth.currentUser.displayName

    for( var chatheads in wholeChats){
        let temp = {}
        db.collection('userinfo').doc(chatheads).get().then((chatheadInfo) => {
          temp.avatarURL = chatheadInfo.data().avatarURL
        })
        var arrayOfChat = wholeChats[chatheads]
        arrayOfChat.sort(function(a,b){
          return a.time - b.time
        })
        arrayOfChat.reverse()
        if (arrayOfChat.length > 0) {
          temp.ukey = name+chatheads
          temp.username = chatheads
          temp.last_message = arrayOfChat[0].text
          temp.last_tick = arrayOfChat[0].seen
          temp.last_message_type = arrayOfChat[0].type
          temp.last_chat_time = arrayOfChat[0].time
          temp.unread_count = 0
          for (var i = 0; i < usersInfo.length; i++) {
            if (usersInfo[i].username === chatheads) {
              temp.avatarURL = usersInfo[i].avatarURL
            }
          }
          setChats((prevChats) => [...prevChats,temp])
        }
      }
  },[wholeChats])


  const showAvatar = (url) => {
    setAvatarURl(url)
    setShowAvatarBox(true)
  }

  const addChat = () => {
    navigation.navigate('NewChat')
  }


  return (
    <View style={{ flex: 1 }}>
    <Header />
    <TouchableOpacity style={styles.newChat} onPress={addChat}>
      <Ionicons name="ios-chatboxes" size={30} color="white" style={{alignSelf: 'center'}} />

    </TouchableOpacity>
    <Text>{auth.currentUser.email}</Text>
    <Modal
      animationType="fade"
      visible={showAvatarBox}
      transparent={true}
      onRequestClose={() => {
        setShowAvatarBox(false)
      }}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <TouchableOpacity
          onPress={() => setShowAvatarBox(false)}
          style={{ position: 'absolute', top: 0,left: 0,right:0,bottom:0, backgroundColor: '#00000066'}}
        >
        </TouchableOpacity>
        <ProfileInfo url={avatarURL} />
      </View>
    </Modal>
      <ScrollView style={{ flex: 1}}>
        {
          chats.map((chat,i) => (
            <TouchableOpacity key={i} onPress={() => navigation.navigate('ChatRoom',{
              roomID: chat.ukey,
              username: chat.username,
              avatarURL: chat.avatarURL
            })}>
            <View style={styles.chat}>
               <TouchableOpacity onPress={() => showAvatar(chat.avatarURL)}>
                <Image
                  style={styles.chat__avatar}
                  source={{
                    uri: chat.avatarURL,
                  }}
                />
              </TouchableOpacity>
              <View style={{ flex: 1, flexDirection: 'column', padding: 5, paddingLeft: 10, paddingRight: 10}}>
                <View style={styles.chat__heading}>
                  <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{chat.username}</Text>
                  {/*<Text style={{ fontSize: 11, color: 'grey'}}>{chat.last_chat_time}</Text> */}
                </View>
                <View style={styles.chat__footer}>
                  {
                    (chat.last_tick === "✔️" || chat.last_tick === "") ? (
                      <Text style={{ color: 'grey'}}>{chat.last_tick}</Text>
                    ) : (
                      <Text style={{ color: 'grey', fontWeight: 'bold'}}>{chat.last_tick + ": "}</Text>
                    )
                  }
                  <Text style={{ color: 'grey'}}>{chat.last_message.slice(0,10) + "..."}</Text>
                  { chat.unread_count !== 0 && (
                    <View style={styles.chat__unreadCount}>
                      <Text style={styles.chat__unreadCountText}>{chat.unread_count}</Text>
                    </View>
                  )}
                </View>
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
  newChat: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 15,
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: "#075e55",
    zIndex: 100,
  },
  chat: {
    // backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    borderRadius: 60,
    flexDirection: 'row',
    padding: 7,
  },
  chat__avatar: {
    width: 60,
    height: 60,
    borderWidth: 0.5,
    borderColor: 'white',  //CHANGE THIS IF YOU THINK IN FUTURE....
    borderRadius: 30,
    backgroundColor: 'lightgrey',
  },
  chat__heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chat__footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'lightgrey',
  },
  chat__unreadCount: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  chat__unreadCountText: {
    backgroundColor: '#22dd66',
    color: 'white',
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 100,
    overflow: 'hidden',
  }
})

export default ChatScreen
