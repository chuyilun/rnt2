import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

//firebase config

var firebaseConfig = {
  apiKey: "AIzaSyBQfOvmVH0QnY1_CDUtn72h02hx03-j3Qk",
  authDomain: "ml2020-46722.firebaseapp.com",
  databaseURL: "https://ml2020-46722.firebaseio.com",
  projectId: "ml2020-46722",
  storageBucket: "ml2020-46722.appspot.com",
  messagingSenderId: "125472571030",
  appId: "1:125472571030:web:5f1fe0d31bf0137bd18cb7",
  measurementId: "G-19KLDW37CC"
};

firebase.initializeApp(firebaseConfig);

//firebase.firestore();

export default firebase;