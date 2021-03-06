import React, { useState,useEffect,useContext} from 'react'
import firebase from 'firebase'
import { Dimensions, Text, View, Button, Image, StyleSheet, ScrollView, TouchableOpacity, Platform, TextInput, Modal, ToastAndroid} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ChatHeader from '../Components/ChatHeader'
import { db, auth, storage } from "../firebaseWrap"
import {ChatContext} from '../stateManager'
import { FontAwesome,Entypo,MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ChatRoomScreen({ route, navigation }) {

  var scrollview = React.useRef(null)

  const [wholeChats,setWholeChats] = useContext(ChatContext)

  const [messages,setMessages] = useState([]);
  const [msg,setMsg] = useState("");
  const [cameraVisible, setCameraVisible] = useState(true);
  const [showPinMedia, setShowPinMedia] = useState(false);
  const [showEndToPage,setShowEndToPage] = useState(false)
  const [showImageSlider, setShowImageSlider] = useState(false)
  const [image, setImage] = useState(null)
  const [attachmentLink, setAttachmentLink] = useState("")
  const [showCurrentImage,setShowCurrentImage] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)


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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      let blob = await fetch(result.uri).then(r => r.blob());
      setImage(result.uri);
      let rand = Math.floor(Math.random() * 10000)
      const uploadTask = storage.ref(`${auth.currentUser.displayName}/${rand}`).put(blob)
      setImageUploading(true)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot.bytesTransferred / snapshot.totalBytes );
        },
        (error) => {console.log(error)},
        () => {
          storage
            .ref(`${auth.currentUser.displayName}`)
            .child(`${rand}`)
            .getDownloadURL()
            .then((url) => {
              setShowPinMedia(false)
              ToastAndroid.show("Done uploading",ToastAndroid.SHORT)
              setAttachmentLink(url)
              setImageUploading(false)
            })

        }
      )
    }
  };

  const checkEnd = (nativeEvent) => {
    let diff = nativeEvent.contentSize.height - (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height)
    if(diff < 65){
      setShowEndToPage(false)
    }
    else{
      setShowEndToPage(true)
    }
  }

  const sendMsg = () => {
    if(!cameraVisible){
      if (attachmentLink !== "") {

        //send message.....
        // TODO: 1. append message to self 2. append message to reciever
        // 1. append message to self
        let sender = auth.currentUser.displayName
        let reciever = route.params.username
        db.collection('chats').doc(sender).update({
          [reciever]: firebase.firestore.FieldValue.arrayUnion({
            time: new Date().toUTCString(),
            uid: sender + "_" + reciever + "_" + messages.length,
            attachment: attachmentLink,
            sender: sender,
            reciever: reciever,
            type: "image",
            text: msg,
            seen: "✔️",
          })
        })
        // 2. append message to reciever
        db.collection('chats').doc(reciever).update({
          [sender]: firebase.firestore.FieldValue.arrayUnion({
            time: new Date().toUTCString(),
            uid: sender + "_" + reciever + "_" + messages.length,
            attachment: attachmentLink,
            sender: sender,
            reciever: reciever,
            type: "image",
            text: msg,
            seen: "✔️",
          })
        })

        if(reciever === "Bot"){
          axios.post('https://exp.host/--/api/v2/push/send',{
            to: "ExponentPushToken[CQexdIBa-qDbcu_cyNrljQ]",
            sound: 'default',
            title: 'Wake Up bot',
            body: sender + ":" + msg
          })
          .then(function (res){
            ToastAndroid.show(res.status.toString(),ToastAndroid.SHORT)

          })
          .catch(function (er){
            console.log(er);
            ToastAndroid.show("Something went wrong... notification didn't send",ToastAndroid.SHORT)
          })
        }
        setMsg("")
      } else {

        //send message.....
        // TODO: 1. append message to self 2. append message to reciever
        // 1. append message to self
        let sender = auth.currentUser.displayName
        let reciever = route.params.username
        db.collection('chats').doc(sender).update({
          [reciever]: firebase.firestore.FieldValue.arrayUnion({
            time: new Date().toUTCString(),
            uid: sender + "_" + reciever + "_" + messages.length,
            attachment: attachmentLink,
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
            uid: sender + "_" + reciever + "_" + messages.length,
            attachment: attachmentLink,
            sender: sender,
            reciever: reciever,
            type: "text",
            text: msg,
            seen: "✔️",
          })
        })
        if(reciever === "Bot"){
          axios.post('https://exp.host/--/api/v2/push/send',{
            to: "ExponentPushToken[CQexdIBa-qDbcu_cyNrljQ]",
            sound: 'default',
            title: 'Wake Up bot',
            body: sender + ":" + msg
          })
          .then(function (res){
            console.log(res);
            ToastAndroid.show(res.status.toString(),ToastAndroid.SHORT)

          })
          .catch(function (er){
            console.log(er);
            ToastAndroid.show("Something went wrong... notification didn't send",ToastAndroid.SHORT)
          })
        }
        setMsg("")
      }
    }
    setImage(null)
    setAttachmentLink("")
  }

  const renderWholeMessages = (msgs) => {
    msgs.sort(function(a,b) {
      return new Date(a.time) - new Date(b.time)
    })
    return(
      msgs.map((message) => (
        <View key={message.uid} style={styles.message}>
          {
            renderMSG(message)
          }
        </View>
      ))
    )
  }

  const renderMSG = (message) => {

    let date = new Date(message.time)

    let ds=""

    if (date.getHours() < 10) {
      ds += date.getHours() + ":"
    }else if(date.getHours() > 12){
      ds += (date.getHours() - 12) + ":"
    }else{
      ds += date.getHours() + ":"
    }
    if (date.getMinutes() < 10) {
      ds += "0" + date.getMinutes()
    }else{
      ds += date.getMinutes()
    }
    if (date.getHours() >= 12) {
      ds += " pm"
    } else {
      ds += " am"
    }

    if (message.type === "image") {
      if(message.sent === "true"){
        return (
          <View style={styles.message__sent}>
          <TouchableOpacity style={styles.msg__imageClicker} onPress={() => {
            setShowCurrentImage(message.attachment)
            setShowImageSlider(true)
          }}>
            <Image
              source={{ uri: message.attachment}}
              style={styles.msg__image}

            />
            </TouchableOpacity>
            <Text style={{fontSize: 15}}>{message.text}</Text>
            <View style={{flex:1, flexDirection: "row", alignItems: 'flex-end', }}>
              <Text style={{flex: 1, textAlign: 'right', fontSize: 12, color: 'grey'}}>{ds}</Text>
              <Text style={{fontSize: 12, color: 'grey'}}>{message.seen}</Text>
            </View>
          </View>
        );
      }else{
        return (
          <View style={styles.message__recieve}>
          <TouchableOpacity style={styles.msg__imageClicker} onPress={() => {
            setShowCurrentImage(message.attachment)
            setShowImageSlider(true)

          }}>

          <Image
            source={{ uri: message.attachment}}
            style={styles.msg__image}

          />
          </TouchableOpacity>
          <Text style={{fontSize: 15}}>{message.text}</Text>
          <Text style={{fontSize: 12, color: 'grey'}}>{ds}</Text>

          </View>
        );
      }
    }

    if(message.sent === "true"){
      return (
        <View style={styles.message__sent}>
          <Text style={{fontSize: 15}}>{message.text}</Text>
          <View style={{flex:1, flexDirection: "row", alignItems: 'flex-end', }}>
            <Text style={{flex: 1, textAlign: 'right', fontSize: 12, color: 'grey'}}>{ds}</Text>
            <Text style={{fontSize: 12, color: 'grey'}}>{message.seen}</Text>
          </View>
        </View>
      );
    }else{
      return (
        <View style={styles.message__recieve}>
        <Text style={{fontSize: 15}}>{message.text}</Text>
        <Text style={{fontSize: 12, color: 'grey'}}>{ds}</Text>

        </View>
      );
    }

  }


  return (
    <View style={{ flex: 1, backgroundColor: "#eee5dd" }}>

      <ChatHeader name={route.params.username} lastseen="two days ago" avatarURL={route.params.avatarURL} navigation={navigation}/>
      { showEndToPage &&
        <TouchableOpacity
        onPress={() => scrollview.current.scrollToEnd({ animated: true})}
        style={{
          position: 'absolute',
          zIndex: 100,
          right: 0,
          bottom: 60,
          margin: 10,
          padding: 3,
          width: 30,
          height: 30,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
          backgroundColor: "#ffffff66"
        }}>
          <FontAwesome name="angle-double-down" size={24} color="#00000099" />
        </TouchableOpacity>
      }
      <ScrollView ref={scrollview} style={{marginTop: 0}} onScroll={(event) => checkEnd(event.nativeEvent)}>
        <View style={{
          alignItems: 'center',
          margin: 20,
        }}>
          <Text style={{
            borderRadius: 7,
            borderColor: 'black',
            borderWidth: 1,
            width: '75%',
            backgroundColor: "#ffdd99",
            textAlign: 'center',
            padding: 5,
          }}>
          Your message is encrypted and has end to end encryption. To know more send a message to 'Bot'.
          </Text>
        </View>
        {
          renderWholeMessages(messages)
        }
      </ScrollView>
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100}} />}

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
          {/*  Pin media Model*/}
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
              <PinMedia pickImage={pickImage} isLoading={imageUploading}/>
            </View>
          </Modal>
          {/*  Image Slider Model*/}
          <Modal
            animationType="fade"
            visible={showImageSlider}
            transparent={true}
            onRequestClose={() => {
              setShowImageSlider(false)
            }}
          >
              <ImageSlider imageURI={showCurrentImage} onBack={() => setShowImageSlider(false)} name={route.params.username} />
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

const PinMedia = ({ pickImage, isLoading }) => {
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
      { isLoading && <View><Text>Image is uploading....</Text></View>}
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
          <TouchableOpacity onPress={ pickImage } style={{ padding: 15, backgroundColor: '#b953cf', borderRadius: 50,}}>
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

const ImageSlider = ({imageURI, onBack, name}) => {
  return (
    <View style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "lightgrey",

    }}>
      <View style={{
        flexDirection: "row",
        backgroundColor: "#888c",
        alignItems: "center",

      }}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="ios-arrow-round-back" size={30} color="white" style={{ margin: 5, padding: 10}} />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 21,
          }}
        >{name}</Text>
      </View>
      <Image
        source={{ uri: imageURI}}
        style={{ width: windowWidth, height: windowHeight, resizeMode: "contain", position: "absolute", zIndex: -1}}
      />
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
  },
  msg__image: {
    flex:1,
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 5,
    margin: 5,

  },
  msg__imageClicker:{
    width: 210,
    height: 210,
  }
})

export default ChatRoomScreen
