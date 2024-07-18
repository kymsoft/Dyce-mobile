// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDjQNIWQY5eUfb1A5XqsMpD30Y_wyxtCKQ",
//   authDomain: "tenet-5203b.firebaseapp.com",
//   projectId: "tenet-5203b",
//   storageBucket: "tenet-5203b.appspot.com",
//   messagingSenderId: "669810235547",
//   appId: "1:669810235547:web:8918356be18f86ae860e3e",
//   measurementId: "G-H9SKNGXGSG"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDZkQ8z4ASRX_rQabBCNZvqyj6tzWb7qRk",
  authDomain: "tenet-app-d5017.firebaseapp.com",
  projectId: "tenet-app-d5017",
  storageBucket: "tenet-app-d5017.appspot.com",
  messagingSenderId: "428178598705",
  appId: "1:428178598705:web:a11e7287b703065d5f1e10",
  measurementId: "G-NYWTFKBH8K"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);