const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyDh2FBNkWVf5b0wkqDEskXsOnb6ac-Db3Y",
  authDomain: "kiei-451-d33e6.firebaseapp.com",
  projectId: "kiei-451-d33e6",
  storageBucket: "kiei-451-d33e6.appspot.com",
  messagingSenderId: "364866132437",
  appId: "1:364866132437:web:789b432547f3aa129fc55c"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase