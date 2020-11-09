import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { auth } from './firebase';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import SigninScreen from './Components/Signin'
import SignupScreen from './Components/Signup'

//// TEMP: inputs Remove till next comment...
import ChatScreen from './Screens/Chat'

// TEMP: Remove all above imports...


import HomeScreen from './Screens/Home'
import SettingsScreen from './Screens/Settings'

const Tab = createBottomTabNavigator();

export default function App() {
  const [user,setUser] = useState(null);
  const [isLoading,setIsLoading] = useState(true);


  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if(authuser){
        // user logged in
        setUser(authuser)
      }
      else{
        //uer logged out
        setUser(null)
      }
      if (isLoading) {
        setIsLoading(false)
      }
    })
  },[])

  const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  if (routeName === 'ChatRoom') {
    return false;
  }

  return true;
}


  if(isLoading){
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Wait a sec....</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>

    {
      user === null ? (
        <View style={{flex: 1}}>
        <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Signin') {
              if(focused){
                return <AntDesign name="login" size={size} color="red" />;
              }
              else{
                return <AntDesign name="login" size={size} color="black" />;
              }
            } else if (route.name === 'Signup') {
              if (focused) {
                return <FontAwesome name="sign-in" size={size} color="red" />;
              }else{
                return <FontAwesome name="sign-in" size={size} color="black" />;
              }

            }

          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'black',
        }}
        >
        <Tab.Screen name="Signin" component={SigninScreen} />
        <Tab.Screen name="Signup" component={SignupScreen} />
        {/* If you add here then also add in above icon function.....*/}
        </Tab.Navigator>
        </NavigationContainer>

        </View>
      ) : (
        <View style={{ flex: 1 }}>
        {/* EVRYTHING IS TEMPORARY TILL NEXT COMMENT
        <Button
          title="SignOut"
          onPress={() => auth.signOut()}
        />
         EVRYTHING IS TEMPORARY TILL thIS COMMENT*/}
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
        <Tab.Screen name="Home" component={HomeScreen} options={({ route }) => ({tabBarVisible: getTabBarVisibility(route)})}/>
        <Tab.Screen name="Status" component={SettingsScreen} />
        <Tab.Screen name="Calls" component={ChatScreen} />
        {/* If you add here then also add in above icon function.....*/}
        </Tab.Navigator>
        </NavigationContainer>
        </View>
      )
    }
    </View>
  );
}
