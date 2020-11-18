import React from 'react'
import { Text, View, Button, StatusBar, StyleSheet, Image, ScrollView } from 'react-native';

var DevInfo = ({imageURI, name, description, tagline}) => {
  return (
    <View style={styles.info__devContainer}>
      <View style={{flexDirection: "row"}}>
        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
          <Image
          style={styles.info__devImage}
          source={{
            uri: imageURI
          }}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.info__devHeader}>{name}</Text>
          <Text style={{ padding: 5, margin: 5, marginBottom: 0, textAlign: "justify" }}>{description}</Text>
        </View>
      </View>
      <View style={{ marginBottom: 5, paddingLeft: 10, paddingRight: 20, marginTop: 10}}>
        <Text>{tagline}</Text>
        <Text style={{textAlign: "right", fontWeight: "bold"}}>{"- "+name}</Text>
      </View>
    </View>
  );
}


function InfoScreen({ navigation }) {
  return (
    <ScrollView>
    <View style={styles.info__container}>
      <View style={styles.info__copyright}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10}}>Copyright</Text>
        <Text style={{ textAlign: 'justify', fontSize: 16, color: 'black'}}>We hearby declare that we do not claim any of the whatsapp styling.
        Also this is completely for educational purpose and does not conatin any purpose of corporative distribution.
        All rights reserved to PhoenixCreation if there is any rights!
        </Text>
      </View>
      <View style={styles.info__devs }>
        <Text style={{ alignSelf: 'center', fontSize: 19, fontWeight: 'bold', marginTop: 5}}>Contributors</Text>
        <DevInfo
          imageURI="https://phoenixcreation2.herokuapp.com/static/logomain.png"
          name="Het Patel"
          description="Also goes as a Phoenix. A full stack developer. Master in copying items like this. A good person, maybe. depends on your point of view."
          tagline="Never annoy someone. You never know who is backing up them."
        />
        <DevInfo
          imageURI="https://phoenixcreation2.herokuapp.com/static/image/p5js/3.jpg"
          name="Gaurav Patel"
          description="A master in finding problems related to privacy and security. Security expert for this app. A person with different vision then whole world."
          tagline="Your worse is mine best and your data is also mine! 😜 🤣  "
        />
      </View>
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  info__container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#eee5dd",
  },
  info__copyright: {
    marginTop: 25,
    width: '90%',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#075e55",
    borderRadius: 15,
  },
  info__devs: {
    flex: 1,
    width: '90%',
    borderWidth: 1,
    borderColor: "#075e55",
    borderRadius: 15,
    margin: 4,
  },
  info__devContainer: {
    borderColor: "#075e55",
    borderWidth: 1,
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    flexDirection: "column",
    padding: 5,
    margin: 5,
  },
  info__devImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: 'black',
  },
  info__devHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center'
  }
})

export default InfoScreen
