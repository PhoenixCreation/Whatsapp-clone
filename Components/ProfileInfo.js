import React from 'react'
import { Text, View, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


function ProfileInfo(props) {
  return (
    <View>
      <View style={styles.profile__username}>
        <Text style={{ fontSize: 20, color: "white"}}>WhatsApp user</Text>
      </View>
      <Image
        style={{ width: 250, height: 250}}
        source={{
          uri: props.url,
        }}
      />
      <View style={styles.profile__bottombar}>
        <TouchableOpacity>
          <Ionicons name="ios-chatboxes" size={24} color="#075e55" style={{alignSelf: 'center'}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="md-call" size={24} color="#075e55" style={{alignSelf: 'center'}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="md-videocam" size={24} color="#075e55" style={{alignSelf: 'center'}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ios-information-circle-outline" size={24} color="#075e55" style={{alignSelf: 'center'}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile__username: {
    backgroundColor: "#33333329",
    marginBottom: -30,
    zIndex: 2,
  },
  profile__bottombar: {
    flexDirection: "row",
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 10,
  }
})

export default ProfileInfo
