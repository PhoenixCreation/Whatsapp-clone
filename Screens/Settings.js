import React from 'react'
import { Text, View, Button } from 'react-native';


function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Button
        title="Go to chats"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

export default SettingsScreen
