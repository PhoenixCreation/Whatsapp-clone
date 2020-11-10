import React from 'react'
import { Text, View, Button, StatusBar, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ChatHeader({name, lastseen, avatarURL, navigation}) {
  StatusBar.setBackgroundColor("#054c44",true)

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-round-back" size={30} color="white" style={{marginRight: 10,alignSelf: 'center'}} />
      </TouchableOpacity>
      <View style={{flex: 1, flexDirection: "row"}}>
        <Image
          style={styles.chat__avatar}
          source={{
            uri: avatarURL,
          }}
        />
        <View stye={{ flex: 1, padding: 10,flexDirection: "column"}}>
          <Text style={styles.header__left}>{name}</Text>
          <Text style={{color: '#dddddd',marginLeft: 10, marginTop: -5}}>{lastseen}</Text>
        </View>
      </View>
      <View style={styles.header__right}>
        <TouchableOpacity>
          <Ionicons name="md-videocam" size={24} color="white" style={styles.header__rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="md-call" size={24} color="white" style={styles.header__rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="md-more" size={24} color="white" style={styles.header__rightIcon, {marginRight: 5}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#075e55",
    padding: 15,
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header__left: {
    fontSize: 17,
    color: 'white',
    marginLeft: 10,
  },
  header__right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
    alignItems: 'center',
  },
  header__rightIcon: {
    marginRight: 23,
  },
  chat__avatar: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderColor: 'white',  //CHANGE THIS IF YOU THINK IN FUTURE....
    borderRadius: 30,
    backgroundColor: 'lightgrey',
  },
})

export default ChatHeader
