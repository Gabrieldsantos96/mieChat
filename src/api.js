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
                  let chats = [...data.chats];
                  chats.sort((a,b) => {
                     if(a.lastmessageDate === undefined) {
                        return -1;
                     }
                     if(b.lastmessageDate === undefined) {
                        return -1;
                     }
                     if(a.lastmessageDate < b.lastmessageDate) {
                        return;
                     } else {
                        return -1;
                     }
                  })
                  setChatlist(data.chats);
            }
         }
      })
   },
   onChatContent:(chatId,setMessages,setUsers) => { 
      return db.collection('chats').doc(chatId).onSnapshot((doc) => {
         if(doc.exists) {
            let data = doc.data();
            setMessages(data.messages);
            setUsers(data.users);
         }
      })
   },
   sendMessage: async (chatData,userId,type,body,users) => {

      let now = new Date();

      db.collection('chats').doc(chatData.chatId).update({
         messages: firebase.firestore.FieldValue.arrayUnion({
            type: type,
            author: userId,
            body: body,
            date: now
         })
      });

      for (let i in users ) {
         let u = await db.collection('users').doc(users[i]).get(); // para cada usuário vai pegar todos os dados
         let uData = u.data(); // guarda tudo dentro de uData
         if(uData.chats) { //se existir algum chat 
            let chats=[... uData.chats]; // guarda tudo dentro de chats

            for(let e in chats) { // se tiver chat, entra nesse laço
                if(chats[e].chatId == chatData.chatId){ // se o chat id de algum dos chats for igual ao chat id passado no message
                     chats[e].lastmessage=body; // o chat encontrado recebe um lastmessage 
                     chats[e].lastmessageDate = now; 
      }
   }
      await db.collection('users').doc(users[i]).update({ // update da chats de todos os users
         chats
         });
         }
      }
   }
};

