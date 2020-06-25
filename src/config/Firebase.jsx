import * as firebase from "firebase"
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB3bat9yTcVRZtuAqPRZumjrjU0PDW38fI",
  authDomain: "bbbs-personal-area-6c2ed.firebaseapp.com",
  databaseURL: "https://bbbs-personal-area-6c2ed.firebaseio.com",
  projectId: "bbbs-personal-area-6c2ed",
  storageBucket: "bbbs-personal-area-6c2ed.appspot.com",
  messagingSenderId: "538406338245",
  appId: "1:538406338245:web:1399cb0838b0ed0861faac"
};

firebase.initializeApp(firebaseConfig);

export default firebase;