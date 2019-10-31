import firebase from "firebase/app";
import "firebase/storage";
require("dotenv").config();
// Web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "phazetune-6a7cc.firebaseapp.com",
  databaseURL: "https://phazetune-6a7cc.firebaseio.com",
  projectId: "phazetune-6a7cc",
  storageBucket: "phazetune-6a7cc.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
