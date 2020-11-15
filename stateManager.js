import React,{ useEffect, useState, createContext } from 'react'
import { db, auth } from './firebaseWrap'

export const ChatContext = createContext();

export const ChatProvider = (props) => {

  const [wholeChats,setWholeChats] = useState([])

  useEffect(() => {
    let name = auth.currentUser.displayName


    if(name){

    db.collection('chats').doc(name).onSnapshot((doc) => {
      setWholeChats(doc.data())
    },
    (error) => {console.log(error)})
  }

  },[auth.currentUser.displayName])

  return (
    <ChatContext.Provider value={[wholeChats,setWholeChats]}>
      {props.children}
    </ChatContext.Provider>
  );
}
