import React from 'react'
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ChatProvider } from '../stateManager'

import ChatScreen from '../Screens/Chat'
import SettingsScreen from '../Screens/Settings'
import ChatRoomScreen from '../Screens/ChatRoom'
import NewChatScreen from '../Components/NewChat'


const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {

  return (
    <ChatProvider>
      <Tab.Navigator
      initialRouteName="Chats"
      resetOnBlur={true}
      tabBarOptions={{
        showLabel: false
      }}
      >
        <Tab.Screen name="Chats" component={ChatScreen}  options={{tabBarVisible: false}}/>
        <Tab.Screen name="ChatRoom" component={ChatRoomScreen} options={{tabBarVisible: false}} />
        <Tab.Screen name="NewChat" component={NewChatScreen} options={{tabBarVisible: false}} />
      </Tab.Navigator>
    </ChatProvider>
  );
}

export default HomeScreen
