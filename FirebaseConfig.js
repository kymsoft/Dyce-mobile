// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const FIREBASE_AUTH = getAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);