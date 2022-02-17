import {initializeApp} from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig={
  apiKey: "AIzaSyB9TJNGrFJ_3mwG406fiXdSxLkYSYzvGXo",
  authDomain: "ntwitter-3503e.firebaseapp.com",
  databaseURL: "https://ntwitter-3503e-default-rtdb.firebaseio.com",
  projectId: "ntwitter-3503e",
  storageBucket: "ntwitter-3503e.appspot.com",
  messagingSenderId: "741102177427",
  appId: "1:741102177427:web:398fa314865660017bd166",
  measurementId: "G-E5CX3TLK1G"
};

const firebaseApp=initializeApp(firebaseConfig);
export const dbService=getFirestore();
export const storageService=getStorage();
export const authService=getAuth(firebaseApp);