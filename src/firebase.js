// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyDm_PG2ltbxagNTwqlnRFRjvFoPCW4CWqE",
  authDomain: "matchingsystem-162dc.firebaseapp.com",
  projectId: "matchingsystem-162dc",
  storageBucket: "matchingsystem-162dc.appspot.com",
  messagingSenderId: "938628877557",
  appId: "1:938628877557:web:0a3d0e3fc700d503f089bc",
  measurementId: "G-HCTQ795FZ9"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// collection references
const usersCollection = db.collection('users')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  storage,
}