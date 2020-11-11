import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBTXpWo3roMCSapyXf3yg0uAZwfrPTPvIg",
  authDomain: "whatsapp-pc.firebaseapp.com",
  databaseURL: "https://whatsapp-pc.firebaseio.com",
  projectId: "whatsapp-pc",
  storageBucket: "whatsapp-pc.appspot.com",
  messagingSenderId: "337639212193",
  appId: "1:337639212193:web:f0d65802171a8f43e15ce0",
  measurementId: "G-QHM4BPTPQH"
};

if(!firebase.apps.length){
  const firebaseApptemp = firebase.initializeApp(firebaseConfig)
}

const db = firebase.app().firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
