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
   }
}