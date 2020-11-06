import React from 'react'
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatScreen from '../Screens/Chat'
import SettingsScreen from '../Screens/Settings'
import ChatRoomScreen from '../Screens/ChatRoom'


const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chats" component={ChatScreen} options={{tabBarVisible: false}} />
      <Tab.Screen name="ChatRoom" component={ChatRoomScreen} options={{tabBarVisible: false}} />
    </Tab.Navigator>
  );
}

export default HomeScreen
