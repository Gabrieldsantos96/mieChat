import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


import firebaseconf from './firebaseconf';

const firebaseApp = firebase.initializeApp(firebaseconf);

const db = firebaseApp.firestore();

export default {
   fbPopup: async() => {
   const provider = new firebase.auth.FacebookAuthProvider();
   let result = await firebaseApp.auth().signInWithPopup(provider);
   return result;
   },
   addUser: async(u) => {
      await db.collection('users').doc(u.id).set({
         name: u.name,
         avatar: u.avatar
      }, {merge:true});
   },
   getContactList:async (userId) => {
      const list = [];

      let results = await db.collection('users').get();
      results.forEach(result => {
         let data = result.data();

         if(result.id !== userId ) {
            list.push({
               id: result.id,
               name: data.name,
               avatar: data.avatar
            });
         }
      });
      return list;
   },
   addNewChat:async (user,user2) => {
      let newChat = await db.collection('chats').add({
         messages: [],
         users:[user.id, user2.id]
      });
      db.collection('users').doc(user.id).update({
         chats: firebase.firestore.FieldValue.arrayUnion({
            chatId: newChat.id,
            title: user2.name,
            image: user2.avatar,
            with: user2.id
         })
      });

      db.collection('users').doc(user2.id).update({
         chats: firebase.firestore.FieldValue.arrayUnion({
            chatId: newChat.id,
            title: user.name,
            image: user.avatar,
            with: user.id
         })
      });
   },
   onChatList:(userId,setChatlist) => {
      return db.collection('users').doc(userId).onSnapshot((doc) => {
         if(doc.exists) {
            let data = doc.data();
               if(data.chats) {
                  setChatlist(data.chats);
            }
         }
      })
   }
};