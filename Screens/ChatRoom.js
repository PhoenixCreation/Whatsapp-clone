import React from 'react'
import { Text, View, Button } from 'react-native';


function ChatRoomScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{route.params.roomID}</Text>
      <Text>{route.params.username}</Text>

    </View>
  );
}

export default ChatRoomScreen
