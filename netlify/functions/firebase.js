const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyDVkSPZVMZPK3UBibMwBmo_2d97KlcJE3Y",
  authDomain: "kiei-451-ec081.firebaseapp.com",
  projectId: "kiei-451-ec081",
  storageBucket: "kiei-451-ec081.appspot.com",
  messagingSenderId: "306609130724",
  appId: "1:306609130724:web:0fe13d2a2ce346f4d970f1",
  measurementId: "G-MWYKVEHD5V"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase