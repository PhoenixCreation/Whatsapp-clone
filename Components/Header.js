import React from 'react'
import { Text, View, Button, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Header() {
  StatusBar.setBackgroundColor("#075e55",true)

  return (
    <View style={styles.header}>
      <Text style={styles.header__left}>WhatsApp</Text>
      <View style={styles.header__right}>
        <TouchableHighlight>
          <Ionicons name="ios-search" size={24} color="white" style={styles.header__rightIcon} />
        </TouchableHighlight>
        <TouchableHighlight>
          <Ionicons name="md-more" size={24} color="white" style={styles.header__rightIcon, {marginRight: 5}} />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#075e55",
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header__left: {
    flex: 1,
    fontSize: 20,
    color: 'white',

  },
  header__right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
    alignItems: 'center',
  },
  header__rightIcon: {
    marginRight: 25,
  }
})

export default Header
