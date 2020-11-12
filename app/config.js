import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

//firebase config

var firebaseConfig = {
  apiKey: "AIzaSyCu1ZoT3HnM-eC3dpaMc3yAIO_S4B6pdNM",
  authDomain: "my-project-e9334.firebaseapp.com",
  databaseURL: "https://my-project-e9334.firebaseio.com",
  projectId: "my-project-e9334",
  storageBucket: "my-project-e9334.appspot.com",
  messagingSenderId: "783734911848",
  appId: "1:783734911848:web:5a1d1205cb1bf8ec8e1cdd",
  measurementId: "G-N3KZRQRLT5"
};

firebase.initializeApp(firebaseConfig);

//firebase.firestore();

export default firebase;