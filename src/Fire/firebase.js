import firebase from 'firebase/app'
import 'firebase/storage'
require('dotenv').config()
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "phazetune.firebaseapp.com",
    databaseURL: "https://phazetune.firebaseio.com",
    projectId: "phazetune",
    storageBucket: "phazetune.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {
    storage, firebase as default
}
