import React from 'react';
import { Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Header from './Components/Header'

//// TEMP: inputs Remove till next comment...
import ChatScreen from './Screens/Chat'

// TEMP: Remove all above imports...


import HomeScreen from './Screens/Home'
import SettingsScreen from './Screens/Settings'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';

              } else if (route.name === 'Status') {
                iconName = focused ? 'ios-list-box' : 'ios-list';

              } else if (route.name === 'Calls') {
                iconName = focused ? 'ios-list-box' : 'ios-list';

              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'black',
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Status" component={SettingsScreen} />
          <Tab.Screen name="Calls" component={ChatScreen} />
          {/* If you add here then also add in above icon function.....*/}
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
